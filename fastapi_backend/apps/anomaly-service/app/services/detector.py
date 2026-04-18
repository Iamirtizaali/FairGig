import pandas as pd
import numpy as np
from scipy import stats
from typing import List
from app.schemas.detect import DetectRequest

def detect_anomalies(payload: DetectRequest) -> List[str]:
    flags = []
    if len(payload.shifts) < 2:
        return flags

    # Convert to DataFrame
    df = pd.DataFrame([s.model_dump() for s in payload.shifts])
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date').reset_index(drop=True)
    
    # Pre-calculations
    df['deduction_pct'] = np.where(df['gross_earned'] > 0, df['platform_deductions'] / df['gross_earned'], 0)
    df['hourly_rate'] = np.where(df['hours_worked'] > 0, df['net_received'] / df['hours_worked'], 0)
    
    if len(df) > 5:
        # 1. Deduction Spikes (Z-score vs baseline)
        z_scores = stats.zscore(df['deduction_pct'])
        recent_z = z_scores[-1]
        
        recent_pct = df['deduction_pct'].iloc[-1] * 100
        mean_pct = df['deduction_pct'].mean() * 100
        
        if recent_z > 2.0:
            flags.append(f"Your platform took {recent_pct:.1f}% in deductions recently vs your usual {mean_pct:.1f}%.")
            
        # 2. Hourly Rate Drops: 2 standard deviations below mean
        rate_z_scores = stats.zscore(df['hourly_rate'])
        recent_rate_z = rate_z_scores[-1]
        
        if recent_rate_z < -2.0:
            recent_rate = df['hourly_rate'].iloc[-1]
            mean_rate = df['hourly_rate'].mean()
            flags.append(f"Your effective hourly rate dropped to PKR {recent_rate:.1f} (significantly below your mean of PKR {mean_rate:.1f}).")
            
    # 3. MoM Income Drop >= 20%
    if len(df) > 1:
        start_date = df['date'].min()
        # Group by rolling 30-day index
        df['30d_period'] = ((df['date'] - start_date).dt.days // 30)
        
        monthly_income = df.groupby('30d_period')['net_received'].sum().sort_index()
        if len(monthly_income) >= 2:
            last_month = monthly_income.iloc[-1]
            prev_month = monthly_income.iloc[-2]
            
            if prev_month > 0:
                drop_pct = ((prev_month - last_month) / prev_month) * 100
                if drop_pct >= 20:
                    flags.append(f"Your income dropped by {drop_pct:.1f}% this month compared to the previous 30-day period.")

    return flags
