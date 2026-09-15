/**
 * Shared SVG artboard for Victoria Modern Script lowercase letters.
 *
 * Practice glyphs are scaled to span ascenderY → baselineY so a/c/s fill
 * the same writing band as tall letters like h (demo-friendly sizing).
 * Half-stroke (14) plus air is included so caps and ruling lines are not clipped.
 */
export const LOWERCASE_ARTBOARD = {
  viewBox: "0 24 240 252",
  fitAspectRatio: 240 / 252,
  strokeWidth: 28,
  /** Path-centerline Y for the ascender line (top of letter h stem). */
  ascenderY: 52,
  /** Path-centerline Y for the writing baseline. */
  baselineY: 248,
} as const;

/** Handwriting-paper dotted lines — same for every lowercase letter. */
export function lowercaseRulingLines(
  strokeWidth: number = LOWERCASE_ARTBOARD.strokeWidth,
) {
  const half = strokeWidth / 2;
  return {
    top: LOWERCASE_ARTBOARD.ascenderY - half,
    bottom: LOWERCASE_ARTBOARD.baselineY + half,
  };
}
