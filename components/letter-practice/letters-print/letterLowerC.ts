import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "c"
 *
 * STROKE 1:
 * One open curve. Starts at the upper-right terminal,
 * arches over the top, sweeps down the left side,
 * rounds the bottom and ends at the lower-right terminal.
 */
export const letterLowerC: LetterDefinition = {
  id: "c",
  letter: "c",
  spokenName: "the letter C",

  acceptTranscripts: [
    "c",
    "see",
    "sea",
    "cee",
    "letter c",
    "the letter c",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — OPEN CURVE
     * Counter-clockwise from the upper right, around the left,
     * and finishing at the lower right.
     */
    [
      "M 160 178",
      "C 152 166 141 159 127 159",
      "C 105 159 90 178 90 206",
      "C 90 234 105 252 127 252",
      "C 142 252 153 245 160 234",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12],
};