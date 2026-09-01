import type { LetterDefinition } from "./types";

/**
 * Cursive (Victoria Modern Script) lowercase h — two strokes.
 *
 * Stroke 1:
 * Starts at the top line and travels straight down to the baseline.
 *
 * Stroke 2:
 * Starts at the baseline, retraces upward along the stem to
 * around x-height, forms a smooth rounded hump, comes back
 * down to the baseline, then finishes with a small exit tail.
 *
 * Coordinates fit a 120×232 artboard.
 */
export const letterLowerH: LetterDefinition = {
  id: "h",
  letter: "h",
  spokenName: "the letter H",
  acceptTranscripts: [
    "h",
    "aitch",
    "letter h",
    "the letter h",
    "huh",
  ],

  // Include half the stroke (14) above the stem so the top ruling line is visible.
  viewBox: "12 24 120 248",
  fitAspectRatio: 120 / 248,

  strokePaths: [
    // 1. Tall descending stem (vertical)
    "M 39 52 L 39 248",

    // 2. Retrace stem upward → rounded hump → down → exit tail
    "M 39 248 C 41 220 43 190 47 165 C 50 146 58 137 68 137 C 84 137 93 153 93 174 C 93 196 84 219 86 235 C 88 248 97 252 106 246 C 112 242 116 235 120 228",
  ],

  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,

  directionArrowFractions: [0.05, 0.1],
};
