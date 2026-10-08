import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "h"
 *
 * STROKE 1:
 * Tall stem. Starts at the ascender height and runs
 * straight down to the baseline.
 *
 * STROKE 2:
 * Arch. Starts on the stem, arches up and over to the right,
 * then runs straight down to the baseline.
 */
export const letterLowerH: LetterDefinition = {
  id: "h",
  letter: "h",
  spokenName: "the letter H",

  acceptTranscripts: [
    "h",
    "aitch",
    "haitch",
    "age",
    "letter h",
    "the letter h",
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
     * STROKE 2 — ARCH
     * Starts on the stem, rises into the shoulder,
     * then runs straight down the right side.
     */
    [
      "M 100 200",
      "C 102 176 116 159 133 159",
      "C 151 159 160 172 160 192",
      "L 160 250",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};