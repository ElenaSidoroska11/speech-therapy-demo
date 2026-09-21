import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase q — two strokes.
 *
 * Stroke 1:
 * Starts at the upper-right at x-height (line 2).
 * Sweeps left across the top, curves down around the
 * left side, forms the rounded oval body, then curves
 * back upward/right to finish near the starting point.
 *
 * Stroke 2:
 * Starts at the upper-right of the oval and travels
 * downward through the baseline to the descender (line 4).
 * At the bottom it curves left slightly, then turns
 * upward/right to form the finishing hook.
 *
 * Ink spans line 2 → line 4 (top does not rise above midline).
 *
 * Reference:
 * 1 = rounded oval body
 * 2 = descending stem + bottom hook
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
     * Rounded a-like oval.
     * Starts at the upper-right, sweeps left over the top
     * (line 2), then travels around the oval and returns upward.
     */
    [
      // Start point 1 — upper-right at x-height
      "M 145 172.0",

      // Sweep left across the top (touches line 2)
      "C 129 164.0 108 164.8 93 171.2",

      // Curve around upper-left side
      "C 78 177.5 70 190.3 67 205.4",

      // Continue down the left side
      "C 64 220.5 68 234.1 77 241.2",

      // Rounded bottom of oval (near baseline)
      "C 86 248.4 99 246.8 111 240.4",

      // Sweep upward/right inside the oval
      "C 124 233.3 134 220.5 140 206.2",

      // Continue upward toward starting area
      "C 145 193.5 148 180.7 145 172.0",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Long descending q stem.
     * Starts at the upper-right of the oval,
     * descends below the baseline and finishes
     * with the characteristic curved hook on line 4.
     */
    [
      // Start point 2
      "M 145 172.0",

      // Descend through the oval
      "C 141 194.3 136 218.1 131 242.0",

      // Continue below baseline
      "C 126 265.1 121 289.0 118 308.9",

      // Approach descender line
      "C 116 319.3 117 325.6 122 328.8",

      // Rounded bottom turn toward the right (line 4)
      "C 128 332.0 137 328.0 146 321.6",

      // Final upward/right hook
      "C 151 318.5 156 314.5 162 309.7",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = oval
  // 2 = descending stem + hook
  directionArrowFractions: [0.12, 0.42],
};
