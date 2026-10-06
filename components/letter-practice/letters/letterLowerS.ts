import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase s — one continuous stroke.
 *
 * Very straight / upright version.
 *
 * - Strong upright appearance.
 * - No rightward slant.
 * - Upper and lower bowls are vertically aligned.
 * - Smooth natural S shape.
 * - Fits between line 2 and line 3.
 */
export const letterLowerS: LetterDefinition = {
  id: "s",

  letter: "s",

  spokenName: "the letter S",

  phonemeSound: "/sounds/s-phoneme.mp3",

  acceptTranscripts: [
    "s",
    "es",
    "ess",
    "letter s",
    "the letter s",
    "sss",
    "suh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start upper-right at x-height
      "M 134 160",

      // Top curve — almost horizontal toward the left
      "C 125 157 114 157 105 161",

      // Rounded upper-left curve
      "C 96 165 93 174 97 182",

      // Smooth inward curve through the centre
      "C 101 190 111 196 121 201",

      // Lower-right curve — kept closer to centre
      "C 130 206 133 214 130 223",

      // Smooth rounded lower bowl
      "C 127 232 118 238 107 240",

      // Finish left along baseline
      "C 97 242 88 240 82 237",
    ].join(" "),
  ],

  strokeWidth: 21,

  previewScale: 0.7,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow near the upper turn
  directionArrowFractions: [0.1],
};