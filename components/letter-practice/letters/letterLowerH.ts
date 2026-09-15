import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

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

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,
  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    // 1. Tall descending stem (vertical)
    "M 79.5 52 L 79.5 248",

    // 2. Retrace stem upward → rounded hump → down → exit tail
    "M 79.5 248 C 81.5 220 83.5 190 87.5 165 C 90.5 146 98.5 137 108.5 137 C 124.5 137 133.5 153 133.5 174 C 133.5 196 124.5 219 126.5 235 C 128.5 248 137.5 252 146.5 246 C 152.5 242 156.5 235 160.5 228",
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,
  traceTolerance: 36,
  traceCoverage: 0.99,

  directionArrowFractions: [0.05, 0.1],
};
