import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "i"
 *
 * STROKE 1:
 * Stem. Starts at x-height and runs straight down
 * to the baseline.
 *
 * STROKE 2:
 * Dot. A very short stroke above the stem.
 */
export const letterLowerI: LetterDefinition = {
  id: "i",
  letter: "i",
  spokenName: "the letter I",

  acceptTranscripts: [
    "i",
    "eye",
    "aye",
    "letter i",
    "the letter i",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — STEM
     * Straight line from x-height down to the baseline.
     */
    [
      "M 128 159",
      "L 128 250",
    ].join(" "),

    /**
     * STROKE 2 — DOT
     * A tiny vertical stroke, which renders as a round dot
     * because of the stroke width.
     */
    [
      "M 128 121",
      "L 128 124",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};