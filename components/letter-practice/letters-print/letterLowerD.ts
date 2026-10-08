import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "d"
 *
 * STROKE 1:
 * Bowl. Starts at the upper-right, arches over the top to the left,
 * rounds the bottom and returns to the stem near the baseline.
 *
 * STROKE 2:
 * Tall stem. Starts at the ascender height and runs
 * straight down to the baseline.
 */
export const letterLowerD: LetterDefinition = {
  id: "d",
  letter: "d",
  spokenName: "the letter D",

  acceptTranscripts: [
    "d",
    "de",
    "dee",
    "letter d",
    "the letter d",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — BOWL
     * Counter-clockwise from the stem, over the top to the left,
     * around the bottom and back to the stem.
     */
    [
      "M 156 188",
      "C 148 168 135 159 120 159",
      "C 101 159 90 178 90 206",
      "C 90 234 102 252 121 252",
      "C 138 252 149 244 156 232",
    ].join(" "),

    /**
     * STROKE 2 — STEM
     * Straight line from ascender height down to the baseline.
     */
    [
      "M 156 112",
      "L 156 250",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};