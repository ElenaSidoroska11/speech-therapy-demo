import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase "th" digraph.
 *
 * Straight / upright version.
 *
 * The t and h are the SAME HEIGHT:
 * both stems start at the ascender line.
 *
 * STROKE 1 — t main stroke:
 * Straight vertical stem → rounded bottom → exit toward h.
 *
 * STROKE 2 — t crossbar.
 *
 * STROKE 3 — h stem:
 * Completely straight vertical stem.
 *
 * STROKE 4 — h hump:
 * Same shape as the standalone lowercase h.
 */

export const letterTh: LetterDefinition = {
  id: "th",

  letter: "th",

  spokenName: "th",

  acceptTranscripts: [
    "th",
    "t h",
    "letter th",
    "the letters th",
    "th sound",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — t main stroke
     *
     * Straight / upright.
     */
    [
      // Start at ascender line
      "M 82 59",

      // Completely straight vertical stem
      "L 82 215",

      // Begin rounded bottom
      "C 82 230 84 239 90 242",

      // Smooth rounded turn
      "C 97 246 104 241 111 235",

      // Handwritten connection toward h
      "C 119 228 126 219 134 210",
    ].join(" "),

    /**
     * STROKE 2 — t crossbar
     */
    [
      "M 55 150",

      // Straight horizontal crossbar
      "L 110 150",
    ].join(" "),

    /**
     * STROKE 3 — h stem
     *
     * Same height as t.
     * Completely straight / vertical.
     */
    [
      // Start at ascender line
      "M 134 59",

      // Straight to baseline
      "L 134 241",
    ].join(" "),

    /**
     * STROKE 4 — h hump
     *
     * Same h shape as the standalone lowercase h.
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

  // 1 = t main
  // 2 = t crossbar
  // 3 = h stem
  // 4 = h hump
  directionArrowFractions: [0.15, 0.5, 0.12, 0.42],
};