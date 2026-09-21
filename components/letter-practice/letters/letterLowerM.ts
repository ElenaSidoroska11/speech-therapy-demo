import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase m — one continuous stroke.
 *
 * Spans line 2 (x-height) → line 3 (baseline):
 *
 * 1. Start near x-height.
 * 2. Small entry under line 2.
 * 3. First downstroke to the baseline.
 * 4. Rise into the first rounded hump (line 2).
 * 5. Descend to the baseline.
 * 6. Rise into the second rounded hump (line 2).
 * 7. Descend to the baseline.
 * 8. Finish with an upward/right exit tail.
 *
 * Reference arrows:
 * 1 = first arch / first downstroke
 * 2 = second arch
 * 3 = third arch / exit section
 */

export const letterLowerM: LetterDefinition = {
  id: "m",

  letter: "m",

  spokenName: "the letter M",

  acceptTranscripts: [
    "m",
    "em",
    "letter m",
    "the letter m",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start on x-height / line 2
      "M 48 168",

      // Small entry — stay under line 2
      "C 56 162 66 160 76 164",

      // First rounded top under line 2
      "C 84 168 86 176 84 186",

      // FIRST DOWNSTROKE to baseline (line 3)
      "C 80 200 74 218 68 234",

      // Rise into FIRST HUMP
      "C 74 218 82 190 94 172",

      // Rounded top of first hump (line 2)
      "C 102 164 114 160 126 164",

      // Descend from first hump
      "C 138 168 138 180 134 194",

      // SECOND DOWNSTROKE to baseline
      "C 130 210 124 224 118 234",

      // Rise into SECOND HUMP
      "C 124 218 132 190 144 172",

      // Rounded top of second hump (line 2)
      "C 152 164 164 160 174 164",

      // Round over the top
      "C 184 168 186 180 182 194",

      // THIRD DOWNSTROKE to baseline
      "C 178 210 172 224 168 234",

      // Bottom turn on baseline
      "C 166 240 172 242 178 240",

      // Short exit tail — upward/right
      "C 186 236 194 228 200 220",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = first section
  // 2 = first hump
  // 3 = second hump
  directionArrowFractions: [0.08, 0.38, 0.68],
};
