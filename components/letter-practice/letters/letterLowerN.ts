import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase n — one continuous stroke.
 *
 * Spans line 2 (x-height) → line 3 (baseline):
 *
 * 1. Start near x-height.
 * 2. Small entry under line 2 into the first hump.
 * 3. Descend to the baseline.
 * 4. Rise into the second rounded hump (line 2).
 * 5. Descend to the baseline.
 * 6. Finish with a short upward/right exit tail.
 *
 * Reference:
 * 1 = first hump
 * 2 = second hump
 * 3 = exit tail
 */

export const letterLowerN: LetterDefinition = {
  id: "n",

  letter: "n",

  spokenName: "the letter N",

  acceptTranscripts: ["n", "en", "letter n", "the letter n"],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start on x-height / line 2
      "M 56 168",

      // Small entry — stay under line 2
      "C 64 162 74 160 84 164",

      // Rounded top of first hump (line 2)
      "C 94 168 98 176 96 186",

      // Descend to baseline (line 3)
      "C 92 200 84 218 78 234",

      // Rise into the second hump
      "C 82 218 90 190 102 172",

      // Rounded top of second hump (line 2)
      "C 110 164 122 160 134 164",

      // Continue over the rounded second hump
      "C 146 168 150 178 148 192",

      // Descend to baseline
      "C 146 208 140 224 136 234",

      // Bottom turn on baseline
      "C 134 240 140 242 148 240",

      // Short exit tail — upward/right
      "C 158 236 168 228 176 220",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // Arrow 1 = first hump
  // Arrow 2 = second hump
  // Arrow 3 = exit tail
  directionArrowFractions: [0.08, 0.46, 0.82],
};
