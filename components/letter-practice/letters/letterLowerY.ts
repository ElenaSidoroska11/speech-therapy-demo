import type { LetterDefinition } from "./types";

/**
 * Cursive (Victoria Modern Script) lowercase y — two strokes.
 * Stroke 1: the “u”, starting on the x-height at the left, down to the
 * baseline with a slight rightward slant, round across the bottom, and
 * back up to the x-height on the right.
 * Stroke 2: continues from that same top point, straight down through the
 * baseline to the descender line, then sweeps left in an open hook that
 * curves slightly upward — like a natural pen lift.
 * Coordinates fit a 120×232 artboard (viewBox "12 40 120 232").
 */
export const letterLowerY: LetterDefinition = {
  id: "y",
  letter: "y",
  spokenName: "the letter Y",
  acceptTranscripts: [
    "y",
    "why",
    "wye",
    "letter y",
    "the letter y",
    "yuh",
  ],
  viewBox: "12 40 120 232",
  fitAspectRatio: 120 / 232,
  strokePaths: [
    "M 32 52 L 38 168 C 48 178 62 178 74 168 L 74 52",
    "M 74 52 L 80 248 C 62 262 42 252 34 232 Q 40 210 50 194",
  ],
  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,
  directionArrowFractions: [0.08, 0.08],
};
