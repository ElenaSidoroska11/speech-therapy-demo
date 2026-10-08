import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "b"
 *
 * STROKE 1:
 * Tall stem. Starts at the ascender height and runs
 * straight down to the baseline.
 *
 * STROKE 2:
 * Bowl. Starts on the stem, arches up and over to the right,
 * rounds the bottom and returns to the stem near the baseline.
 */
export const letterLowerB: LetterDefinition = {
  id: "b",
  letter: "b",
  spokenName: "the letter B",

  acceptTranscripts: [
    "b",
    "be",
    "bee",
    "letter b",
    "the letter b",
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
      "M 100 112",
      "L 100 250",
    ].join(" "),

    /**
     * STROKE 2 — BOWL
     * Starts on the stem, goes up and over the top,
     * down the right side, and back to the stem at the bottom.
     */
    [
      "M 100 188",
      "C 108 168 121 159 136 159",
      "C 155 159 166 178 166 206",
      "C 166 234 154 252 135 252",
      "C 118 252 107 244 100 232",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};