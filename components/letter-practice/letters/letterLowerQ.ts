import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase q — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Rounded upright oval between line 2 and line 3.
 *
 * Stroke 2:
 * Starts at the upper-right of the oval and travels
 * completely STRAIGHT vertically downward.
 *
 * Near the bottom, the straight stem transitions very gradually
 * into a soft rounded curve and finishes gently upward/right.
 *
 * No sharp corner and no deep semicircle.
 *
 * Reference:
 * 1 = rounded upright oval
 * 2 = straight descending stem + smooth gradual hook
 */

export const letterLowerQ: LetterDefinition = {
  id: "q",

  letter: "q",

  spokenName: "the letter Q",

  acceptTranscripts: [
    "q",
    "cue",
    "queue",
    "letter q",
    "the letter q",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Upright rounded oval.
     */
    [
      // Start point 1 — upper-right at x-height
      "M 145 165",

      // Sweep horizontally left across the top
      "C 132 158 111 158 96 164",

      // Rounded upper-left side
      "C 80 170 72 183 72 200",

      // Upright left side
      "C 72 217 76 232 85 239",

      // Rounded bottom
      "C 94 246 107 246 118 239",

      // Upright right side
      "C 130 231 138 217 142 201",

      // Continue upward to starting point
      "C 146 185 148 172 145 165",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Straight vertical stem with a very smooth,
     * gradual rounded exit.
     */
    [
      // Start point — upper-right of oval
      "M 145 165",

      // Completely straight through the oval
      "C 145 190 145 216 145 241",

      // Continue completely straight downward
      "C 145 265 145 289 145 311",

      // Straight almost all the way to the bottom
      "C 145 322 145 331 145 336",

      // Very gradual beginning of the curve
      "C 145 341 147 344 151 345",

      // Smooth rounded transition
      "C 156 347 162 345 167 341",

      // Continue naturally into the hook
      "C 173 336 177 329 180 322",

      // Soft upward/right finish
      "C 182 319 183 316 184 314",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = oval
  // 2 = straight descending stem + smooth gradual hook
  directionArrowFractions: [0.12, 0.42],
};