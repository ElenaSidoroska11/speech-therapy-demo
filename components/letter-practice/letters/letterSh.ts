import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Cursive lowercase "sh" digraph.
 *
 * STROKE 1 — s:
 * Starts at x-height on the upper-right.
 * Curves left into the top of the s, travels down through
 * the centre, forms the lower curve, then exits right.
 *
 * STROKE 2 — h stem:
 * Starts at the ascender line and travels downward
 * with a slight leftward slant to the baseline.
 *
 * STROKE 3 — h hump:
 * Starts at the bottom of the stem, retraces upward
 * to x-height, forms the rounded hump, descends to
 * the baseline, then finishes with an exit tail.
 */

export const letterSh: LetterDefinition = {
  id: "sh",

  letter: "sh",

  spokenName: "sh",

  acceptTranscripts: [
    "sh",
    "s h",
    "letter sh",
    "the letters sh",
    "sh sound",
    "shh",
    "shhh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — lowercase s
     *
     * x-height → upper curve → centre →
     * lower curve → exit toward h.
     */
    [
      // Start at upper-right at x-height
      "M 105 161.7",

      // Sweep left across top
      "C 94 155.5 79 155.8 69 161",

      // Curve inward/down through upper part
      "C 58 166.8 57 176 66 183",

      // Cross through centre toward right
      "C 74 189 89 190 94 198",

      // Curve back left into lower bowl
      "C 101 208 95 222 85 232",

      // Round around bottom
      "C 75 242 58 244 49 236",

      // Lower-left turn
      "C 41 229 43 218 52 213",

      // Sweep across lower section
      "C 62 207 77 210 87 217",

      // Exit upward/right
      "C 96 223 104 220 111 213",

      // Connection toward h
      "C 116 208 120 202 124 197",
    ].join(" "),

    /**
     * STROKE 2 — h stem
     *
     * Ascender line → baseline.
     */
    [
      // Start at ascender/top line
      "M 154 59",

      // Slight leftward slant
      "C 149 88.7 143 121.2 137 153.7",

      // Continue to baseline
      "C 131 187.2 124 216.8 118 241",
    ].join(" "),

    /**
     * STROKE 3 — h hump
     *
     * Retrace upward → x-height →
     * hump → baseline → exit tail.
     */
    [
      // Start at bottom of h stem
      "M 118 241",

      // Retrace upward
      "C 124 224.5 131 204.4 137 181.6",

      // Reach x-height
      "C 143 170.8 153 165.2 165 165.2",

      // Rounded hump
      "C 182 165.2 193 173.4 194 184.8",

      // Descend right side
      "C 195 197.5 188 212 185 223.9",

      // Reach baseline
      "C 182 235.4 184 241 192 241",

      // Exit tail
      "C 202 241 215 238.5 228 229",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // Arrow 1 = s
  // Arrow 2 = h stem
  // Arrow 3 = h hump
  directionArrowFractions: [0.1, 0.12, 0.42],
};