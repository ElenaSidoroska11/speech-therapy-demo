import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "e"
 *
 * STROKE 1:
 * One continuous stroke. Starts at the left end of the crossbar,
 * runs right along the bar, curves up and over the top,
 * sweeps down the left side, rounds the bottom
 * and ends at the lower-right terminal.
 */
export const letterLowerE: LetterDefinition = {
  id: "e",
  letter: "e",
  spokenName: "the letter E",

  acceptTranscripts: [
    "e",
    "ee",
    "eee",
    "letter e",
    "the letter e",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — CROSSBAR + CURVE
     * Bar first, then counter-clockwise around the letter.
     */
    [
      // Left end of the crossbar
      "M 91 206",

      // Straight bar to the right
      "L 160 206",

      // Up and over the top
      "C 160 178 148 159 127 159",

      // Down the left side
      "C 105 159 91 178 91 206",

      // Around the bottom
      "C 91 234 105 252 127 252",

      // Lower-right terminal
      "C 144 252 156 245 164 234",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12],
};