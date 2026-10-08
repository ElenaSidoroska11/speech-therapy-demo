import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase "wh" digraph.
 *
 * Straight / upright connected version.
 *
 * STROKE 1 — w first valley
 * STROKE 2 — w second valley + original rightward exit
 * STROKE 3 — h straight stem
 * STROKE 4 — h hump
 */

export const letterWh: LetterDefinition = {
  id: "wh",

  letter: "wh",

  spokenName: "wh",

  acceptTranscripts: [
    "wh",
    "w h",
    "double u h",
    "double you h",
    "letter wh",
    "the letters wh",
    "wh sound",
    "what",
    "when",
    "where",
    "why",
    "which",
    "white",
    "whale",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — w first section
     *
     * Same w shape, only straightened.
     */
    [
      // Start at x-height
      "M 7 157.5",

      // Straight vertical downstroke
      "C 7 178.3 7 205.9 7 222.1",

      // First rounded bottom
      "C 7 235.9 12 244 20 244",

      // Sweep right along bottom
      "C 29 244 37 234.8 44 219.8",

      // Rise to x-height
      "C 52 201.3 54 178.3 55 157.5",
    ].join(" "),

    /**
     * STROKE 2 — w second section
     *
     * Same shape + original rightward finishing exit.
     */
    [
      // Start at x-height
      "M 55 157.5",

      // Straight vertical downstroke
      "C 55 179.4 55 205.9 55 222.1",

      // Second rounded bottom
      "C 55 235.9 60 244 68 244",

      // Sweep right along bottom
      "C 77 244 85 234.8 92 219.8",

      // Rise back to x-height
      "C 100 201.3 102 178.3 103 157.5",

      // Original finishing stroke:
      // continues RIGHT from the top of w
      "C 109 159 115 160 121 157.5",
    ].join(" "),

    /**
     * STROKE 3 — h stem
     *
     * Completely straight / vertical.
     */
    [
      // Start at ascender line
      "M 136 59",

      // Straight vertical stem
      "L 136 241",
    ].join(" "),

    /**
     * STROKE 4 — h hump
     *
     * Same shape as standalone lowercase h.
     */
    [
      // Start at bottom of h stem
      "M 136 241",

      // Retrace straight upward
      "L 136 181",

      // Continue to x-height
      "L 136 164",

      // Smooth transition into hump
      "C 138 159 146 157 158 157",

      // Rounded hump
      "C 180 157 195 165 196 184",

      // Go almost straight down
      "C 196 199 196 216 196 226",

      // Begin rounded bottom
      "C 196 235 199 241 206 241",

      // Continue rounded semicircle-like turn
      "C 214 241 220 237 225 232",

      // Smooth upward/right exit
      "C 229 228 233 224 237 220",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = w first
  // 2 = w second + rightward exit
  // 3 = h stem
  // 4 = h hump
  directionArrowFractions: [0.12, 0.12, 0.12, 0.42],
};
