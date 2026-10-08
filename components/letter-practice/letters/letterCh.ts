import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Cursive lowercase "ch" digraph.
 *
 * STROKE 1 — c:
 * Rounded lowercase c with an exit toward the h.
 *
 * STROKE 2 — h stem:
 * Straight vertical stem from ascender line to baseline.
 *
 * STROKE 3 — h hump:
 * Same shape as the standalone lowercase h:
 * retrace upward → rounded hump →
 * straight downward section →
 * rounded semicircle bottom → exit tail.
 */

export const letterCh: LetterDefinition = {
  id: "ch",

  letter: "ch",

  spokenName: "ch",

  acceptTranscripts: [
    "ch",
    "c h",
    "letter ch",
    "the letters ch",
    "ch sound",
    "chuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — c
     */
    [
      // Start at upper-right of c
      "M 105 161.7",

      // Rounded top moving left
      "C 92.7 155.2 77 155.2 64.1 159.8",

      // Curve down the left side
      "C 47.8 165.6 37.9 177.9 35.6 194.7",

      // Continue around left/bottom
      "C 33.2 212.3 39.1 230.1 50.1 237.8",

      // Round across baseline
      "C 61.2 244.5 75.2 242.3 85.1 232.3",

      // Exit upward/right toward h
      "C 91 225.5 97 217.5 103 210",

      // Connecting tail toward h
      "C 109 202.5 115 198.5 121 197",
    ].join(" "),

    /**
     * STROKE 2 — h stem
     *
     * Same straight stem as standalone h,
     * shifted to the right.
     */
    [
      "M 134 59",
      "L 134 241",
    ].join(" "),

    /**
     * STROKE 3 — h hump
     *
     * Same shape as standalone lowercase h,
     * shifted right.
     */
    [
      // Start at bottom of h stem
      "M 134 241",

      // Retrace straight upward
      "L 134 181",

      // Continue to x-height
      "L 134 164",

      // Smooth transition into hump
      "C 136 159 144 157 156 157",

      // Rounded hump
      "C 178 157 193 165 194 184",

      // Go almost straight down
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

  // Arrow 1 = c
  // Arrow 2 = h stem
  // Arrow 3 = h hump
  directionArrowFractions: [0.1, 0.12, 0.42],
};