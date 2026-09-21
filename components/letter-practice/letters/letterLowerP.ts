import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase p — two strokes.
 *
 * Stroke 1:
 * Starts at x-height and travels downward with a slight
 * leftward slant, passing the baseline and continuing
 * to the descender line.
 *
 * Stroke 2:
 * Starts slightly to the RIGHT of stroke 1, leaving
 * a small visible gap between the two starting points.
 * It rises into an n-shaped rounded hump, descends
 * to the baseline, then curves upward/right
 * into the exit tail.
 *
 * Stroke 1 is unchanged. Stroke 2 is the same smooth
 * hump, scaled to sit between line 2 and line 3.
 *
 * Reference:
 * 1 = descending stem
 * 2 = rounded hump + exit tail (line 2 → line 3)
 */

export const letterLowerP: LetterDefinition = {
  id: "p",

  letter: "p",

  spokenName: "the letter P",

  acceptTranscripts: [
    "p",
    "pee",
    "letter p",
    "the letter p",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Long descending stem (unchanged).
     */
    [
      // Start point 1
      "M 88 146",

      // Slightly left-slanted descent
      "C 85 170 81 198 77 226",

      // Continue below baseline
      "C 73 254 69 282 65 308",

      // Finish near descender line
      "C 63 322 61 334 59 342",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Starts separately to the RIGHT of stroke 1.
     * Same smooth n-shaped hump — scaled to sit
     * between line 2 and line 3.
     */
    [
      // Start point 2 — separate from stroke 1
      "M 90 191.1",

      // Sweep upward/right into the hump (touches line 2)
      "C 115 164.5 125 160.5 136 160.5",

      // Rounded top of hump along line 2
      "C 149 160.5 157 165.8 160 173.8",

      // Round over the right side
      "C 163 181.7 160 192.4 156 201.7",

      // Descend toward baseline
      "C 152 211.6 148 220.9 146 228.2",

      // Rounded bottom turn at baseline (line 3)
      "C 144 234.2 148 237.5 156 237.5",

      // Exit tail upward/right
      "C 168 237.5 181 227.5 195 216.3",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = descending stem
  // 2 = rounded hump
  directionArrowFractions: [0.16, 0.28],
};
