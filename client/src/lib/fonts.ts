/**
 * ─── FairGig Font System ──────────────────────────────────────────────────────
 *
 * SINGLE SOURCE OF TRUTH for all font families in the project.
 *
 * HOW IT WORKS:
 * ┌──────────────────────────────────────────────────────┐
 * │  1. Change the string values here (font name only)   │
 * │  2. Update the Google Fonts @import in index.css     │
 * │  3. EVERYTHING using `font.display`, `font.mono` etc │
 * │     picks up the new font automatically              │
 * └──────────────────────────────────────────────────────┘
 *
 * Usage in JSX:   <h1 className={font.display}>…</h1>
 *                 <span className={font.mono}>…</span>
 *
 * Usage for CSS-in-JS (e.g. Recharts axis):
 *                 fontFamily: fontFamily.display
 *
 * The CSS layer (index.css) mirrors these via CSS custom properties:
 *   --fg-font-display / --fg-font-body / --fg-font-mono / --fg-font-urdu
 * Those CSS vars are exposed by Tailwind v4 as `font-display`, `font-body`,
 * `font-mono`, `font-urdu` utility classes — which is exactly what `font`
 * object below resolves to.
 */

// ─── Raw font family strings (for CSS-in-JS / non-Tailwind contexts) ──────────
export const fontFamily = {
  display: "'Syne', sans-serif",
  body:    "'DM Sans', sans-serif",
  mono:    "'JetBrains Mono', monospace",
  urdu:    "'Noto Nastaliq Urdu', serif",
} as const

// ─── Tailwind class strings (use these in className=) ─────────────────────────
// These map directly to the @theme inline tokens in index.css:
//   --font-display → class "font-display"
//   --font-mono    → class "font-mono"
//   --font-body    → class "font-body"  (also "font-sans")
//   --font-urdu    → class "font-urdu"
export const font = {
  display: 'font-display',
  body:    'font-body',
  mono:    'font-mono',
  urdu:    'font-urdu',
} as const

export type FontKey = keyof typeof font
