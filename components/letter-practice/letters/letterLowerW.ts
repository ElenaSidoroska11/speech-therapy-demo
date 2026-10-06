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
      "M 52 157.5",

      // Downstroke, slightly leaning left
      "C 49 178.3 45 205.9 44 222.1",

      // First rounded bottom
      "C 43 235.9 49 244 59 244",

      // Sweep right along the bottom
      "C 71 244 81 234.8 90 219.8",

      // Rise to x-height in the middle
      "C 101 201.3 108 178.3 113 157.5",
    ].join(" "),

    [
      // Stroke 2 — start at x-height in the middle
      "M 113 157.5",

      // Descend with a slight leftward slant
      "C 110 179.4 106 205.9 105 222.1",

      // Second rounded bottom
      "C 104 235.9 110 244 120 244",

      // Sweep through second rounded section
      "C 132 244 142 234.8 151 219.8",

      // Rise strongly back to x-height
      "C 162 201.3 169 178.3 174 157.5",
    ].join(" "),

    [
      // Stroke 3 — small finishing stroke at upper-right
      "M 174 157.5",

      // Short rightward exit
      "C 182 159.8 190 161 198 157.5",
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