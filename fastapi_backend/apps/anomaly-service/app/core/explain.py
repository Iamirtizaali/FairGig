def explain_deduction_spike(observed_pct: float, baseline_pct: float) -> str:
    return f"Your platform cut {observed_pct:.0%} this week versus your usual {baseline_pct:.0%}."

def explain_hourly_rate_drop(observed_rate: float, baseline_rate: float, currency: str) -> str:
    return f"Your hourly rate dropped to {observed_rate:.1f} {currency} vs your usual {baseline_rate:.1f} {currency}."

def explain_income_drop_mom(observed_drop_pct: float) -> str:
    return f"Your total monthly income collapsed by {observed_drop_pct:.0%}."
