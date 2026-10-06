import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase k — two strokes.
 *
 * Client-adjusted version:
 * - Stroke 1 is straight / vertical.
 * - Stroke 2 connects directly to Stroke 1.
 * - Keeps the rounded k shape.
 * - Shorter exit tail.
 */
export const letterLowerK: LetterDefinition = {
  id: "k",

  letter: "k",

  spokenName: "the letter K",

  acceptTranscripts: [
    "k",
    "kay",
    "letter k",
    "the letter k",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Straight vertical stem:
     * ascender line → baseline.
     */
    [
      // Start at top / ascender line
      "M 100 59",

      // Straight down to baseline
      "L 100 238.7",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Slightly separated from Stroke 1.
     */
    [
      // Start just slightly to the right of the vertical stem
      "M 104 168.1",

      // Sweep upward/right into the top loop
      "C 114 156 127 152 140 157.4",

      // Rounded top/right side
      "C 154 163.8 158 176.7 152 189.5",

      // Return toward the waist
      "C 145 201 132 205 120 204",

      // Come close to Stroke 1, but leave a very small gap
      "C 112 203 107 201 104 202",

      // Move out into the lower arm
      "C 111 207 119 216 130 223.7",

      // Rounded lower arm toward baseline
      "C 142 236.6 153 242.5 163 241.5",

      // Shorter exit tail
      "C 170 240.8 176 236.5 181 230.5",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.16, 0.30],
};