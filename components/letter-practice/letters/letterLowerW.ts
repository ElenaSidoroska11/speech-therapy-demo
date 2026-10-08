import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase w — three strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Travels STRAIGHT vertically downward,
 * forms the first smooth rounded bottom,
 * then rises back to x-height.
 *
 * Stroke 2:
 * Starts at x-height in the middle.
 * Travels STRAIGHT vertically downward,
 * forms the second smooth rounded bottom,
 * then rises back to x-height.
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

      // Straight vertical downstroke
      "C 52 178.3 52 205.9 52 222.1",

      // First smooth rounded bottom
      "C 52 235.9 57 244 67 244",

      // Wide rounded turn
      "C 79 244 90 234.8 99 219.8",

      // Smooth upright rise to x-height
      "C 108 201.3 112 178.3 113 157.5",
    ].join(" "),

    [
      // Stroke 2 — start at x-height in the middle
      "M 113 157.5",

      // Straight vertical downstroke
      "C 113 179.4 113 205.9 113 222.1",

      // Second smooth rounded bottom
      "C 113 235.9 118 244 128 244",

      // Wide rounded turn
      "C 140 244 151 234.8 160 219.8",

      // Smooth upright rise to x-height
      "C 169 201.3 173 178.3 174 157.5",
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