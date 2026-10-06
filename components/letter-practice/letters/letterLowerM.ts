import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase m — one continuous stroke.
 *
 * Straight / upright version.
 *
 * Three rounded upright arches.
 *
 * Each main downstroke is vertical with no left/right slant.
 * The rounded tops and spacing between the three sections
 * are preserved.
 *
 * Final tail:
 * - stays aligned with line 3
 * - smooth rounded bottom
 * - short gradual upward/right finish
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
      // =====================================================
      // 1 — FIRST SECTION
      // =====================================================

      "M 46 165",

      // Smooth approach to first top
      "C 52 160 59 157 66 157",

      // First rounded top
      "C 74 157 79 164 79 175",

      // Straight / upright first downstroke
      "C 79 194 79 217 79 236",


      // =====================================================
      // 2 — SECOND SECTION
      // =====================================================

      // Rise toward second arch
      "C 79 215 84 190 97 171",

      // Smooth approach to second top
      "C 104 161 111 157 119 157",

      // Second rounded top
      "C 128 157 134 164 134 175",

      // Straight / upright second downstroke
      "C 134 194 134 217 134 236",


      // =====================================================
      // 3 — THIRD SECTION
      // =====================================================

      // Rise toward third arch
      "C 134 215 140 190 153 171",

      // Smooth approach to third top
      "C 160 161 167 157 175 157",

      // Third rounded top
      "C 184 157 190 164 190 175",

      // Straight / upright third downstroke
      "C 190 193 190 210 190 224",


      // =====================================================
      // FINAL TAIL — SMOOTH + ALIGNED WITH LINE 3
      // =====================================================

      // Continue vertically toward baseline
      "C 190 229 190 233 193 235",

      // Wide smooth rounded bottom
      "C 196 238 201 238 206 235",

      // Smooth transition toward the right
      "C 211 232 215 228 219 223",

      // Gradual upward/right exit
      "C 223 218 226 213 229 209",

      // Short smooth finish
      "C 230 207 231 206 232 204",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.08, 0.39, 0.69],
};