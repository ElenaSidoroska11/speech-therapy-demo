import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "l"
 *
 * STROKE 1:
 * Tall stem. Starts at the ascender height and runs
 * straight down to the baseline.
 */
export const letterLowerL: LetterDefinition = {
  id: "l",
  letter: "l",
  spokenName: "the letter L",

  acceptTranscripts: [
    "l",
    "el",
    "ell",
    "letter l",
    "the letter l",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — STEM
     * Straight line from ascender height down to the baseline.
     */
    [
      "M 128 112",
      "L 128 250",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12],
};