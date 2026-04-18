/**
 * ─── Recharts Dark Theme ──────────────────────────────────────────────────────
 * Shared color constants and style props for all FairGig charts.
 * Import from here — never hardcode colors directly in chart components.
 */

// ─── Series Colors ─────────────────────────────────────────────────────────────
export const CHART_COLORS = {
  primary:    '#00D4FF',   // Cyan — primary data series
  secondary:  '#6EE7B7',   // Emerald — verified / positive
  warning:    '#F59E0B',   // Amber — self-attested / caution
  danger:     '#F87171',   // Red — flagged / negative
  purple:     '#A78BFA',   // Purple — advocate actions
  slate:      '#94A3B8',   // Slate — neutral / reference lines
  careem:     '#22C55E',
  uber:       '#FFFFFF',
  bykea:      '#F97316',
  foodpanda:  '#EF4444',
  indrive:    '#3B82F6',
} as const

export const PLATFORM_COLORS: Record<string, string> = {
  careem:    CHART_COLORS.careem,
  uber:      CHART_COLORS.uber,
  bykea:     CHART_COLORS.bykea,
  foodpanda: CHART_COLORS.foodpanda,
  indrive:   CHART_COLORS.indrive,
  other:     CHART_COLORS.slate,
}

// ─── Shared Recharts Style Props ───────────────────────────────────────────────
export const darkGridProps = {
  stroke:          '#1E293B',
  strokeDasharray: '3 3',
  vertical:        false,
} as const

export const tooltipStyle = {
  contentStyle: {
    background:   '#1B1F2C',
    border:       '1px solid #1E293B',
    borderRadius: '8px',
    color:        '#F1F5F9',
    fontSize:     '13px',
    fontFamily:   "'DM Sans', sans-serif",
  },
  itemStyle:    { color: '#94A3B8' },
  labelStyle:   { color: '#F1F5F9', fontWeight: 600 },
  cursor:       { fill: 'rgba(255,255,255,0.03)' },
} as const

export const axisStyle = {
  tick:         { fill: '#94A3B8', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" },
  axisLine:     { stroke: '#1E293B' },
  tickLine:     false as const,
} as const

// ─── Standard Chart Container Dimensions ──────────────────────────────────────
export const CHART_HEIGHT = {
  mini:   120,
  small:  200,
  medium: 300,
  large:  400,
} as const
