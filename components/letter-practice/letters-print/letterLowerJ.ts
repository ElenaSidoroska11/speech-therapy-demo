import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "j"
 *
 * STROKE 1:
 * Stem with descender. Starts at x-height, runs straight down
 * below the baseline and hooks to the left.
 *
 * STROKE 2:
 * Dot. A very short stroke above the stem.
 */
export const letterLowerJ: LetterDefinition = {
  id: "j",
  letter: "j",
  spokenName: "the letter J",

  acceptTranscripts: [
    "j",
    "jay",
    "jaye",
    "letter j",
    "the letter j",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — STEM + DESCENDER
     * Straight down from x-height, then curves left below the baseline.
     */
    [
      "M 138 159",
      "L 138 265",
      "C 138 289 122 300 100 300",
      "C 86 300 76 296 68 288",
    ].join(" "),

    /**
     * STROKE 2 — DOT
     * A tiny vertical stroke, which renders as a round dot
     * because of the stroke width.
     */
    [
      "M 138 121",
      "L 138 124",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};