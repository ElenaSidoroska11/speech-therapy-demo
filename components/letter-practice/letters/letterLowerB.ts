import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase b — one continuous stroke.
 *
 * Client-adjusted:
 * - Straight stem
 * - Very rounded semicircular bottom
 * - Smooth transition into the bowl
 *
 * Same client path, shifted up so it does not cross baseline (line 3).
 */
export const letterLowerB: LetterDefinition = {
  id: "b",

  letter: "b",

  spokenName: "the letter B",

  acceptTranscripts: [
    "b",
    "bee",
    "be",
    "letter b",
    "the letter b",
    "buh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Straight stem down
      "M 102 52",
      "L 102 207",

      // Continue vertically before rounding
      "C 102 223 102 233 108 239",

      // Wider and deeper semicircular bottom
      "C 114 246 126 248 138 242",

      // Smooth rounded rise on the right
      "C 151 236 160 223 166 208",

      // Continue smoothly into the bowl
      "C 172 191 174 169 174 150",

      // Small rounded exit tail
      "C 175 145 178 144 182 146",

      // Finish almost horizontally
      "C 188 149 195 150 202 147",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.58],
};
