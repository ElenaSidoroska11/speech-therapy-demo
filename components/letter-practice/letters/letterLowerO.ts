import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase o — one continuous stroke.
 *
 * Stroke 1:
 * Starts at the upper-right of the oval near x-height.
 * Travels counterclockwise:
 *
 * top-right → top-left → down left side → baseline →
 * up right side → closes at the starting point →
 * short exit tail to the right.
 *
 * Path spans midline (line 2) → baseline (line 3) so the
 * visible guide stroke touches both ruling lines.
 *
 * Reference:
 * 1 = counterclockwise oval + exit tail
 */

export const letterLowerO: LetterDefinition = {
  id: "o",

  letter: "o",

  spokenName: "the letter O",

  acceptTranscripts: [
    "o",
    "oh",
    "letter o",
    "the letter o",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start at upper-right — top of oval on midline (line 2)
      "M 132 167.4",

      // Travel LEFT across the rounded top (touches line 2)
      "C 118 159.7 100 158.1 86 164.3",

      // Curve down the left side
      "C 70 172.1 64 189.2 66 206.3",

      // Continue down toward baseline (line 3)
      "C 68 224.9 78 235.8 92 237.3",

      // Round the bottom of the oval on the baseline
      "C 108 238.9 122 229.6 128 214",

      // Travel upward along the right side
      "C 134 198.5 136 181.4 132 167.4",

      // Close near the starting point and begin exit
      "C 140 170.5 148 172.1 158 170.5",

      // Short, slightly upward/right exit tail
      "C 168 169.8 176 167.4 184 164.3",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // Arrow 1 = counterclockwise direction around oval
  directionArrowFractions: [0.10],
};
