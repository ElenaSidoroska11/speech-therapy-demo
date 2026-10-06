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
      "M 105 157.5",

      // Descend with a slight leftward slant
      "C 102 178 98 200.6 98 215.6",

      // Rounded bottom of the u-shape
      "C 98 228.5 104 235 114 235",

      // Sweep right and begin rising
      "C 126 235 137 224.2 145 210.2",

      // Rise back to x-height
      "C 155 193 161 173.6 165 157.5",
    ].join(" "),

    [
      // Stroke 2 — start at x-height on the right
      "M 165 157.5",

      // Descend along the right stem
      "C 162 182.3 158 210.2 155 235",

      // Continue below the baseline
      "C 152 258.7 149 281.3 145 299.6",

      // Curve toward the bottom of the descender
      "C 141 319 133 330.8 121 335.1",

      // Large rounded sweep toward the left
      "C 108 340.5 91 339.4 76 334",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Stroke 1: downward from x-height
  // Stroke 2: downward through the descender
  directionArrowFractions: [0.13, 0.27],
};