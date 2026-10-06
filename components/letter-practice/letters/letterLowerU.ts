import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase u — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Travels STRAIGHT vertically downward toward the baseline,
 * rounds smoothly at the bottom,
 * then rises STRAIGHT back up to x-height.
 *
 * Stroke 2:
 * Starts at x-height at the top of the second stem.
 * Travels STRAIGHT vertically downward,
 * rounds smoothly at the baseline,
 * then curves gently upward/right into the exit tail.
 */

export const letterLowerU: LetterDefinition = {
  id: "u",

  letter: "u",

  spokenName: "the letter U",

  phonemeSound: "/sounds/u-phoneme.mp3",

  acceptTranscripts: [
    "u",
    "you",
    "letter u",
    "the letter u",
    "uh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at x-height
      "M 103 157.5",

      // Straight vertical downstroke
      "C 103 178 103 205 103 222.8",

      // Smooth rounded bottom
      "C 103 235 108 242 117 243.4",
      "C 127 244 137 235 141 222.8",

      // Straight / upright rise to x-height
      "C 145 205 150 180 150 157.5",
    ].join(" "),

    [
      // Stroke 2 — start at x-height
      "M 150 157.5",

      // Straight vertical downstroke
      "C 150 179 150 205 150 222.8",

      // Smooth rounded bottom
      "C 150 235 154 242 162 243.4",

      // Original-style exit tail
      "C 170 244 176 236 179 225",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 20,

  traceCoverage: 0.99,

  directionArrowFractions: [0.13, 0.16],
};