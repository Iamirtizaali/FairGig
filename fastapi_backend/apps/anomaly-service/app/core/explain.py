"""
Plain-language explanation templates for anomaly detection — Sprint 4.

Design rules (reviewed against the brief's 'human-readable' requirement):
  - Write for a gig worker with no statistical background.
  - Always include the concrete number AND the usual baseline.
  - Estimate the cash impact where possible (Rs. amount per week).
  - Never use jargon: no 'z-score', 'standard deviation', 'outlier'.
  - Read each sentence aloud — if it sounds like a textbook, rewrite it.
"""


def explain_deduction_spike(
    observed_pct: float,
    baseline_pct: float,
    gross_earned: float = 0.0,
    currency: str = "PKR",
) -> str:
    """
    Example output:
        "Your platform took 34% in deductions last week, compared to your
         usual 11%. That's roughly PKR 1,200 more than normal — check your
         earnings statement for an explanation."
    """
    obs_display = round(observed_pct * 100)
    base_display = round(baseline_pct * 100)
    extra_rs = ""
    if gross_earned > 0:
        extra = gross_earned * (observed_pct - baseline_pct)
        extra_rs = f" That's roughly {currency} {extra:,.0f} more than normal —"
    return (
        f"Your platform took {obs_display}% in deductions last week, compared to your "
        f"usual {base_display}%.{extra_rs} check your earnings statement for an explanation."
    )


def explain_hourly_rate_drop(
    observed_rate: float,
    baseline_rate: float,
    currency: str = "PKR",
) -> str:
    """
    Example output:
        "Your effective hourly pay dropped to PKR 312 last week, well below
         your normal PKR 487. You earned PKR 175 less per hour than usual."
    """
    diff = baseline_rate - observed_rate
    return (
        f"Your effective hourly pay dropped to {currency} {observed_rate:,.0f} last week, "
        f"well below your normal {currency} {baseline_rate:,.0f}. "
        f"You earned {currency} {diff:,.0f} less per hour than usual."
    )


def explain_income_drop_mom(
    drop_pct: float,
    prior_total: float = 0.0,
    current_total: float = 0.0,
    currency: str = "PKR",
) -> str:
    """
    Example output:
        "Your total income this month is PKR 14,200 — that's 31% lower than
         last month's PKR 20,600. This could mean fewer shifts, lower rates,
         or higher platform deductions."
    """
    pct_display = round(drop_pct * 100)
    if prior_total > 0 and current_total > 0:
        return (
            f"Your total income this month is {currency} {current_total:,.0f} — "
            f"that's {pct_display}% lower than last month's {currency} {prior_total:,.0f}. "
            f"This could mean fewer shifts, lower rates, or higher platform deductions."
        )
    return (
        f"Your total monthly income fell by {pct_display}% compared to last month. "
        f"This could mean fewer shifts, lower rates, or higher platform deductions."
    )
