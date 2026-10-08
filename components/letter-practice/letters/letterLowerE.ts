import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

export const letterLowerE: LetterDefinition = {
  id: "e",

  letter: "e",

  spokenName: "the letter E",

  acceptTranscripts: [
    "e",
    "ee",
    "letter e",
    "the letter e",
    "eh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Starting point
      "M 90 199.6",

      // Enter upper loop
      "C 101 198 111 192 120 183",

      // Right side of narrow closed loop
      "C 129 174 133 163 129 157",

      // Rounded top
      "C 124 151.5 115 153 108 159",

      // Left side
      "C 98 167 90 183 88 199.6",

      // Lower bowl
      "C 89 219 94 234 108 241",

      // Bottom curve — turns earlier
      "C 116 245 123 241 129 233",

      // Exit tail — more to the LEFT / closer to loop
      "C 133 227 136 222 138 217",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.8,

  traceTolerance: 28,

  traceCoverage: 0.99,

  directionArrowFractions: [0.08],
};