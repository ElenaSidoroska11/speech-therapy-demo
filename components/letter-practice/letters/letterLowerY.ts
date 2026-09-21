import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase y — two strokes.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Travels downward with a slight leftward slant,
 * forms a smooth rounded bottom at the baseline,
 * then rises back up to x-height.
 *
 * Stroke 2:
 * Starts at x-height on the right.
 * Travels downward through the baseline and continues
 * into the descender area.
 * At the bottom it forms a large rounded curve
 * sweeping toward the left along the descender line.
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
      "M 105 165",

      // Descend with a slight leftward slant
      "C 102 184 98 205 98 219",

      // Rounded bottom of the u-shape
      "C 98 231 104 237 114 237",

      // Sweep right and begin rising
      "C 126 237 137 227 145 214",

      // Rise back to x-height
      "C 155 198 161 180 165 165",
    ].join(" "),

    [
      // Stroke 2 — start at x-height on the right
      "M 165 165",

      // Descend along the right stem
      "C 162 188 158 214 155 237",

      // Continue below the baseline
      "C 152 259 149 280 145 297",

      // Curve toward the bottom of the descender
      "C 141 315 133 326 121 330",

      // Large rounded sweep toward the left
      "C 108 335 91 334 76 329",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Stroke 1: downward from x-height
  // Stroke 2: downward through the descender
  directionArrowFractions: [0.13, 0.27],
};