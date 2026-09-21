import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase w — three strokes.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Descends with a slight leftward slant,
 * forms the first rounded bottom,
 * then rises smoothly to x-height.
 *
 * Stroke 2:
 * Starts at x-height in the middle.
 * Descends to form the second rounded bottom,
 * then rises smoothly back to x-height.
 *
 * Stroke 3:
 * Short finishing stroke at the upper-right,
 * moving gently to the right.
 */

export const letterLowerW: LetterDefinition = {
  id: "w",

  letter: "w",

  spokenName: "the letter W",

  phonemeSound: "/sounds/w-phoneme.mp3",

  acceptTranscripts: [
    "w",
    "double u",
    "double you",
    "letter w",
    "the letter w",
    "wuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at x-height on the left
      "M 52 165",

      // Downstroke, slightly leaning left
      "C 49 183 45 207 44 221",

      // First rounded bottom
      "C 43 233 49 240 59 240",

      // Sweep right along the bottom
      "C 71 240 81 232 90 219",

      // Rise to x-height in the middle
      "C 101 203 108 183 113 165",
    ].join(" "),

    [
      // Stroke 2 — start at x-height in the middle
      "M 113 165",

      // Descend with a slight leftward slant
      "C 110 184 106 207 105 221",

      // Second rounded bottom
      "C 104 233 110 240 120 240",

      // Sweep through second rounded section
      "C 132 240 142 232 151 219",

      // Rise strongly back to x-height
      "C 162 203 169 183 174 165",
    ].join(" "),

    [
      // Stroke 3 — small finishing stroke at upper-right
      "M 174 165",

      // Short rightward exit
      "C 182 167 190 168 198 165",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Stroke 1: downward
  // Stroke 2: downward
  // Stroke 3: rightward
  directionArrowFractions: [0.12, 0.12, 0.5],
};