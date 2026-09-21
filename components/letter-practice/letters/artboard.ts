/**
 * Shared SVG artboard for Victoria Modern Script lowercase letters.
 *
 * Four handwriting-paper lines (equal spacing):
 *   1. topline   (ascender)  — top of tall letters (b, d, h, …)  [dotted]
 *   2. midline   (x-height)  — top of short letters (a, c, e, …) [dotted]
 *   3. baseline              — where letters sit                 [solid]
 *   4. bottomline (descender)— tails (f, g, y, …)               [dotted]
 *
 * Path centerlines use these Y values. Half-stroke air is included in the
 * viewBox so caps and ruling lines are not clipped.
 */
export const LOWERCASE_ARTBOARD = {
  /** y=24 … y=374 — air above topline and below bottomline */
  viewBox: "0 24 240 350",
  fitAspectRatio: 240 / 350,
  strokeWidth: 28,
  /** Line 1 — path-centerline Y for ascenders (top of letter h stem). */
  ascenderY: 52,
  /** Line 2 — path-centerline Y for x-height (top of short letters). */
  midlineY: 150,
  /** Line 3 — path-centerline Y for the writing baseline. */
  baselineY: 248,
  /** Line 4 — path-centerline Y for descenders. */
  descenderY: 346,
} as const;

/** Handwriting-paper guides — same for every lowercase letter. */
export function lowercaseRulingLines() {
  return {
    top: LOWERCASE_ARTBOARD.ascenderY,
    mid: LOWERCASE_ARTBOARD.midlineY,
    baseline: LOWERCASE_ARTBOARD.baselineY,
    bottom: LOWERCASE_ARTBOARD.descenderY,
  };
}
