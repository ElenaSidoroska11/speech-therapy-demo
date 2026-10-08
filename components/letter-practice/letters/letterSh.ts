import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Cursive lowercase "sh" digraph.
 *
 * Straight / upright connected version.
 *
 * STROKE 1 — s:
 * Starts at x-height on the upper-right.
 * Forms the rounded s shape and continues
 * naturally toward the h.
 *
 * STROKE 2 — h stem:
 * Straight vertical stem from ascender line to baseline.
 *
 * STROKE 3 — h hump:
 * Same shape as the standalone lowercase h.
 * Retraces straight upward → rounded hump →
 * straight downward section → rounded bottom →
 * exit tail.
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
     * Rounded s with handwritten connection to h.
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

      // Continue toward h
      "C 117 207 123 201 128 196",

      // Smooth handwritten connection into h stem
      "C 131 192 133 188 134 184",
    ].join(" "),

    /**
     * STROKE 2 — h stem
     *
     * Completely straight / vertical.
     */
    [
      // Start at ascender line
      "M 134 59",

      // Straight vertical stem to baseline
      "L 134 241",
    ].join(" "),

    /**
     * STROKE 3 — h hump
     *
     * Same shape as standalone lowercase h.
     */
    [
      // Start at bottom of h stem
      "M 134 241",

      // Retrace straight upward
      "L 134 181",

      // Continue straight to x-height
      "L 134 164",

      // Smooth transition into hump
      "C 136 159 144 157 156 157",

      // Rounded hump
      "C 178 157 193 165 194 184",

      // Almost straight downward
      "C 194 199 194 216 194 226",

      // Begin rounded bottom
      "C 194 235 197 241 204 241",

      // Rounded semicircle-like turn
      "C 212 241 218 237 223 232",

      // Smooth upward/right exit
      "C 227 228 231 224 235 220",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // Arrow 1 = s
  // Arrow 2 = straight h stem
  // Arrow 3 = h hump
  directionArrowFractions: [0.1, 0.12, 0.42],
};