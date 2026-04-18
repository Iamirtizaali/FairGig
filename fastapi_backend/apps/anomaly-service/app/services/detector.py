import pandas as pd
import numpy as np
from typing import List
from ..schemas.detect import Shift, Anomaly, AnomalyKind, AnomalySeverity
from ..core.explain import explain_deduction_spike, explain_hourly_rate_drop, explain_income_drop_mom

def get_severity(z: float, base_threshold: float) -> AnomalySeverity:
    abs_z = abs(z)
    if abs_z >= base_threshold + 1.5:
        return AnomalySeverity.high
    elif abs_z >= base_threshold + 0.5:
        return AnomalySeverity.medium
    return AnomalySeverity.low

def detect(shifts: List[Shift], z_threshold: float = 2.5, mom_drop_pct: float = 20.0, currency: str = "PKR") -> List[Anomaly]:
    anomalies = []
    if not shifts:
        return anomalies

    df = pd.DataFrame([s.model_dump() for s in shifts])
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date').reset_index(drop=True)
    
    # We must have enough data
    if len(df) == 0:
        return anomalies

    # Daily aggregation (if there are multiple shifts per day) to make rolling windows cleaner
    daily_df = df.groupby('date').agg({
        'gross_earned': 'sum',
        'platform_deductions': 'sum',
        'net_received': 'sum',
        'hours_worked': 'sum'
    }).reset_index()

    daily_df['deduction_pct'] = np.where(daily_df['gross_earned'] > 0, daily_df['platform_deductions'] / daily_df['gross_earned'], 0)
    daily_df['hourly_rate'] = np.where(daily_df['hours_worked'] > 0, daily_df['net_received'] / daily_df['hours_worked'], 0)

    # 60 day rolling
    daily_df = daily_df.set_index('date')
    
    # Need to group by weekly frequencies to compare weekly means to 60-day trailing baseline
    # First, let's establish 60-day trailing mean and std
    rolling_60d = daily_df.rolling('60D', min_periods=5)
    baseline_mean_deduction = rolling_60d['deduction_pct'].mean()
    baseline_std_deduction = rolling_60d['deduction_pct'].std()
    
    baseline_mean_hourly = rolling_60d['hourly_rate'].mean()
    baseline_std_hourly = rolling_60d['hourly_rate'].std()

    daily_df['base_deduc_mean'] = baseline_mean_deduction
    daily_df['base_deduc_std'] = baseline_std_deduction
    daily_df['base_hourly_mean'] = baseline_mean_hourly
    daily_df['base_hourly_std'] = baseline_std_hourly

    # Now group by weekly
    weekly_df = daily_df.resample('W').agg({
        'deduction_pct': 'mean',
        'hourly_rate': 'mean',
        'base_deduc_mean': 'last',
        'base_deduc_std': 'last',
        'base_hourly_mean': 'last',
        'base_hourly_std': 'last'
    }).dropna()

    for idx, row in weekly_df.iterrows():
        # Deduction spike
        deduc_std = max(row['base_deduc_std'], 0.01)
        z_deduc = (row['deduction_pct'] - row['base_deduc_mean']) / deduc_std
        if z_deduc > z_threshold:
            anomalies.append(Anomaly(
                kind=AnomalyKind.deduction_spike,
                severity=get_severity(z_deduc, z_threshold),
                window=f"Week ending {idx.date()}",
                metric="deduction_pct",
                observed=row['deduction_pct'],
                baseline_mean=row['base_deduc_mean'],
                baseline_std=deduc_std,
                z=z_deduc,
                explanation=explain_deduction_spike(
                    row['deduction_pct'], row['base_deduc_mean'],
                    gross_earned=float(daily_df.loc[daily_df.index <= idx, 'gross_earned'].tail(7).sum()),
                    currency=currency
                )
            ))
        
        # Hourly rate drop
        hr_std = max(row['base_hourly_std'], 1.0) # Rs 1 at least
        z_hr = (row['hourly_rate'] - row['base_hourly_mean']) / hr_std
        # We look for a drop, so standard deviations below
        if z_hr < -z_threshold:
            anomalies.append(Anomaly(
                kind=AnomalyKind.hourly_rate_drop,
                severity=get_severity(-z_hr, z_threshold),
                window=f"Week ending {idx.date()}",
                metric="hourly_rate",
                observed=row['hourly_rate'],
                baseline_mean=row['base_hourly_mean'],
                baseline_std=hr_std,
                z=z_hr,
                explanation=explain_hourly_rate_drop(row['hourly_rate'], row['base_hourly_mean'], currency)
            ))

    if not anomalies and len(daily_df) >= 2:
        # Short-history fallback: compare the latest day against prior days only.
        latest = daily_df.iloc[-1]
        prior = daily_df.iloc[:-1]
        prior_mean = float(prior['deduction_pct'].mean())
        prior_std = float(prior['deduction_pct'].std()) if len(prior) > 1 else 0.0
        prior_std = max(prior_std, 0.01)
        z_latest = (float(latest['deduction_pct']) - prior_mean) / prior_std

        if z_latest > z_threshold:
            anomalies.append(Anomaly(
                kind=AnomalyKind.deduction_spike,
                severity=get_severity(z_latest, z_threshold),
                window=f"Day ending {latest.name.date()}",
                metric="deduction_pct",
                observed=float(latest['deduction_pct']),
                baseline_mean=prior_mean,
                baseline_std=prior_std,
                z=float(z_latest),
                explanation=explain_deduction_spike(
                    float(latest['deduction_pct']), prior_mean,
                    gross_earned=float(latest['gross_earned']),
                    currency=currency
                )
            ))

    # MOM Income Drop (30-day trailing windows)
    if len(daily_df) >= 30: # Need at least a full month to even compare to something
        last_date = daily_df.index[-1]
        last_30d_start = last_date - pd.Timedelta(days=30)
        prev_30d_start = last_30d_start - pd.Timedelta(days=30)

        # exclusive indexing to strictly split 30-day blocks
        last_month = daily_df.loc[(daily_df.index > last_30d_start) & (daily_df.index <= last_date), 'net_received'].sum()
        prev_month = daily_df.loc[(daily_df.index > prev_30d_start) & (daily_df.index <= last_30d_start), 'net_received'].sum()
        
        if prev_month > 0:
            drop_pct = ((prev_month - last_month) / prev_month) * 100
            if drop_pct >= mom_drop_pct:
                anomalies.append(Anomaly(
                    kind=AnomalyKind.income_drop_mom,
                    severity=AnomalySeverity.high if drop_pct > (mom_drop_pct + 20) else AnomalySeverity.medium,
                    window=f"30 days ending {last_date.date()}",
                    metric="net_received",
                    observed=last_month,
                    baseline_mean=prev_month,
                    baseline_std=0.0,
                    z=0.0, 
                    explanation=explain_income_drop_mom(
                        drop_pct / 100.0,
                        prior_total=float(prev_month),
                        current_total=float(last_month),
                        currency=currency
                    )
                ))

    return anomalies
