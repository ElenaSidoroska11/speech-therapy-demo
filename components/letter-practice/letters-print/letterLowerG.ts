import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "g" (single-storey)
 *
 * STROKE 1:
 * Bowl. Starts at the upper-right, arches over the top to the left,
 * rounds the bottom and returns to the stem.
 *
 * STROKE 2:
 * Stem with descender. Runs straight down from x-height,
 * below the baseline, and hooks to the left.
 */
export const letterLowerG: LetterDefinition = {
  id: "g",
  letter: "g",
  spokenName: "the letter G",

  acceptTranscripts: [
    "g",
    "gee",
    "jee",
    "letter g",
    "the letter g",
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
      "C 101 159 90 176 90 200",
      "C 90 224 102 241 121 241",
      "C 138 241 149 233 156 221",
    ].join(" "),

    /**
     * STROKE 2 — STEM + DESCENDER
     * Straight down from x-height, then curves left below the baseline.
     */
    [
      "M 156 159",
      "L 156 265",
      "C 156 289 140 300 118 300",
      "C 104 300 94 296 86 288",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};