import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase y — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Travels STRAIGHT vertically downward,
 * forms a smooth rounded bottom,
 * then rises back up to x-height.
 *
 * Stroke 2:
 * Starts at x-height on the right.
 * Travels STRAIGHT vertically downward,
 * passes through the baseline and continues
 * into the descender area.
 * At the bottom it forms the original large
 * rounded curve sweeping toward the left.
 */

export const letterLowerY: LetterDefinition = {
  id: "y",

  letter: "y",

  spokenName: "the letter Y",

  phonemeSound: "/sounds/y-phoneme.mp3",

  acceptTranscripts: [
    "y",
    "why",
    "letter y",
    "the letter y",
    "yuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at x-height on the left
      "M 105 157.5",

      // Straight vertical downstroke
      "C 105 178 105 200.6 105 215.6",

      // Smooth rounded bottom
      "C 105 228.5 111 235 121 235",

      // Rounded turn and rise
      "C 133 235 143 224.2 151 210.2",

      // Smooth upright rise back to x-height
      "C 160 193 164 173.6 165 157.5",
    ].join(" "),

    [
      // Stroke 2 — start at x-height on the right
      "M 165 157.5",

      // Straight vertical downstroke
      "C 165 182.3 165 210.2 165 235",

      // Continue straight through the baseline
      // into the descender area
      "C 165 258.7 165 281.3 162 299.6",

      // Begin the rounded descender turn
      "C 159 318 150 330.8 138 335.1",

      // Large smooth rounded sweep toward the left
      "C 124 340.5 96 339.4 76 334",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Stroke 1: downward from x-height
  // Stroke 2: straight downward through the descender
  directionArrowFractions: [0.13, 0.27],
};