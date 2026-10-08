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

      "M 34 165",

      // Smooth approach to first top
      "C 40 160 47 157 54 157",

      // First rounded top
      "C 62 157 67 164 67 175",

      // Straight / upright first downstroke
      "C 67 194 67 217 67 236",


      // =====================================================
      // 2 — SECOND SECTION
      // =====================================================

      // Rise toward second arch
      "C 67 215 72 190 85 171",

      // Smooth approach to second top
      "C 92 161 99 157 107 157",

      // Second rounded top
      "C 116 157 122 164 122 175",

      // Straight / upright second downstroke
      "C 122 194 122 217 122 236",


      // =====================================================
      // 3 — THIRD SECTION
      // =====================================================

      // Rise toward third arch
      "C 122 215 128 190 141 171",

      // Smooth approach to third top
      "C 148 161 155 157 163 157",

      // Third rounded top
      "C 172 157 178 164 178 175",

      // Straight / upright third downstroke
      "C 178 193 178 210 178 224",


      // =====================================================
      // FINAL TAIL — SMOOTH + ALIGNED WITH LINE 3
      // =====================================================

      // Continue vertically toward baseline
      "C 178 229 178 233 181 235",

      // Wide smooth rounded bottom
      "C 184 238 189 238 194 235",

      // Smooth transition toward the right
      "C 199 232 203 228 207 223",

      // Gradual upward/right exit
      "C 211 218 214 213 217 209",

      // Short smooth finish
      "C 218 207 219 206 220 204",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.08, 0.39, 0.69],
};