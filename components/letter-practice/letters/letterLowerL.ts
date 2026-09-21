import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase l — one stroke.
 *
 * Starts at the ascender line, descends with a slight
 * leftward slant, makes a broad rounded turn on the
 * baseline, then rises smoothly up and right.
 */
export const letterLowerL: LetterDefinition = {
  id: "l",

  letter: "l",

  spokenName: "the letter L",

  acceptTranscripts: [
    "l",
    "el",
    "ell",
    "letter l",
    "the letter l",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start at top / ascender line
      "M 112 66",

      // Tall stem — ease the slant gradually
      "C 106 110 98 155 92 190",

      // Soften into the baseline (no hard corner)
      "C 88 212 84 228 88 236",

      // Continuous rounded bowl → exit (one smooth sweep)
      "C 92 244 110 242 124 232",
      "C 136 222 146 212 154 204",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.18],
};