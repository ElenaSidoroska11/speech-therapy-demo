import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "m"
 *
 * STROKE 1:
 * Left stem. Starts at x-height and runs straight down
 * to the baseline.
 *
 * STROKE 2:
 * First arch. Starts on the left stem, arches up and over,
 * then runs straight down to the baseline.
 *
 * STROKE 3:
 * Second arch. Starts on the first leg, arches up and over,
 * then runs straight down to the baseline.
 */
export const letterLowerM: LetterDefinition = {
  id: "m",
  letter: "m",
  spokenName: "the letter M",

  acceptTranscripts: [
    "m",
    "em",
    "emm",
    "letter m",
    "the letter m",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — LEFT STEM
     * Straight line from x-height down to the baseline.
     */
    [
      "M 70 159",
      "L 70 250",
    ].join(" "),

    /**
     * STROKE 2 — FIRST ARCH
     * Starts on the left stem, rises into the first shoulder,
     * then runs straight down the middle leg.
     */
    [
      "M 70 200",
      "C 72 176 83 159 101 159",
      "C 118 159 126 171 126 192",
      "L 126 250",
    ].join(" "),

    /**
     * STROKE 3 — SECOND ARCH
     * Starts on the middle leg, rises into the second shoulder,
     * then runs straight down the right leg.
     */
    [
      "M 126 200",
      "C 128 176 139 159 157 159",
      "C 174 159 182 171 182 192",
      "L 182 250",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12, 0.12],
};