import type { LetterDefinition } from "./types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase f — two strokes.
 *
 * Client-adjusted version:
 * - Main stem is straight / vertical.
 * - Crossbar is straight / horizontal.
 * - Keeps the rounded top of the lowercase f.
 */
export const letterLowerF: LetterDefinition = {
  id: "f",
  letter: "f",
  spokenName: "the letter F",

  acceptTranscripts: [
    "f",
    "ef",
    "eff",
    "letter f",
    "the letter f",
    "fff",
    "fuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Rounded top → straight vertical stem → descender.
     */
    [
      // Start at the upper-right
      "M 157 65.5",

      // Rounded top of the f
      "C 142 59 125 63 116 77",

      // Smoothly enter the vertical stem
      "C 108 89 106 105 106 125",

      // Straight vertical section
      "L 106 339",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Completely straight horizontal crossbar.
     */
    [
      "M 67 186",
      "L 151 186",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.15],
};