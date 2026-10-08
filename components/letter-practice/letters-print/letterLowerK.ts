import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "k"
 *
 * STROKE 1:
 * Tall stem. Starts at the ascender height and runs
 * straight down to the baseline.
 *
 * STROKE 2:
 * Upper arm. Starts at the upper right, runs diagonally
 * down and left to meet the stem.
 *
 * STROKE 3:
 * Leg. Starts on the upper arm near the stem, runs diagonally
 * down and to the right to the baseline.
 */
export const letterLowerK: LetterDefinition = {
  id: "k",
  letter: "k",
  spokenName: "the letter K",

  acceptTranscripts: [
    "k",
    "kay",
    "okay",
    "letter k",
    "the letter k",
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
     * STROKE 2 — UPPER ARM
     * Diagonal from the upper right down to the stem.
     */
    [
      "M 156 159",
      "L 100 213",
    ].join(" "),

    /**
     * STROKE 3 — LEG
     * Diagonal from the arm, near the stem, down to the baseline.
     */
    [
      "M 118 196",
      "L 160 250",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12, 0.12],
};