import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase o — one continuous stroke.
 *
 * Upright / straightened version.
 *
 * Stroke 1:
 * Starts at the upper-right of the oval near x-height.
 * Travels counterclockwise:
 *
 * top-right → top-left → down left side → baseline →
 * up right side → closes at the starting point →
 * short exit tail to the right.
 *
 * The oval is vertically balanced so it does not appear slanted.
 *
 * Path spans midline (line 2) → baseline (line 3).
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
      // Start at upper-right near x-height
      "M 132 164",

      // Rounded top — travel left
      "C 120 156 102 155 88 161",

      // Straight / balanced left side
      "C 73 168 66 185 66 203",

      // Continue smoothly toward baseline
      "C 66 224 76 239 91 242",

      // Rounded bottom — centered under the top
      "C 107 245 122 236 129 219",

      // Upright right side
      "C 136 202 137 181 132 164",

      // Close the oval and begin exit
      "C 139 168 146 169 153 168",

      // Short smooth exit tail
      "C 161 167 168 164 175 161",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  // Match m/n tile size — o’s tight bbox otherwise fills the card larger
  previewScale: 0.8,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // Arrow 1 = counterclockwise direction around oval
  directionArrowFractions: [0.10],
};