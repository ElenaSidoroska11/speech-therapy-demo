import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase n — one continuous stroke.
 *
 * Straight / upright version.
 *
 * Two rounded arches.
 * Both downstrokes are straight / vertical with no slant.
 *
 * The exit tail stays on step 2.
 */
export const letterLowerN: LetterDefinition = {
  id: "n",
  letter: "n",

  spokenName: "the letter N",

  acceptTranscripts: [
    "n",
    "en",
    "letter n",
    "the letter n",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // =====================================================
      // 1 — FIRST SECTION
      // =====================================================

      "M 52 164",

      // Smooth beginning toward first top
      "C 59 159 66 157 73 157",

      // First rounded top
      "C 82 157 87 165 87 176",

      // Straight vertical first downstroke
      "C 87 193 87 217 87 236",


      // =====================================================
      // 2 — SECOND SECTION
      // =====================================================

      // Rise toward second arch
      "C 87 215 94 190 107 171",

      // Smooth approach toward second top
      "C 114 162 122 157 131 157",

      // Wide rounded second top
      "C 140 157 146 164 146 175",

      // Straight vertical second downstroke
      "C 146 192 146 210 146 222",


      // =====================================================
      // FINAL TAIL
      // =====================================================

      // Continue vertically toward baseline
      "C 146 228 146 232 149 234",

      // Smooth rounded bottom
      "C 152 237 157 237 162 235",

      // Smooth transition toward the right
      "C 167 233 172 229 177 225",

      // Gradual upward/right finish
      "C 182 221 187 216 192 211",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  // 1 = first arch
  // 2 = second arch + exit tail
  directionArrowFractions: [0.08, 0.62],
};