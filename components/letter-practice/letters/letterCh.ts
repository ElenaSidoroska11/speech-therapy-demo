import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Cursive lowercase "ch" digraph.
 *
 * STROKE 1 — c:
 * Starts at x-height, curves left/down around the c,
 * then finishes with an exit stroke that leads toward the h.
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
     *
     * Same basic shape as your lowercase c,
     * shifted left to leave room for the h.
     */
    [
      // Start at upper-right of c at x-height
      "M 105 161.7",

      // Rounded top moving left
      "C 92.7 155.2 77 155.2 64.1 159.8",

      // Curve down the left side
      "C 47.8 165.6 37.9 177.9 35.6 194.7",

      // Continue around left/bottom
      "C 33.2 212.3 39.1 230.1 50.1 237.8",

      // Round across baseline
      "C 61.2 244.5 75.2 242.3 85.1 232.3",

      // Exit upward/right toward the h
      "C 91 225.5 97 217.5 103 210",

      // Slight connecting tail toward h
      "C 109 202.5 114 198.5 119 197",
    ].join(" "),

    /**
     * STROKE 2 — h stem
     *
     * Ascender → baseline.
     */
    [
      // Top blue dot
      "M 151 59",

      // Slight leftward slant
      "C 146 88.7 140 121.2 134 153.7",

      "C 128 187.2 121 216.8 115 241",
    ].join(" "),

    /**
     * STROKE 3 — h hump
     *
     * Retrace upward → hump → baseline → exit tail.
     */
    [
      // Start where h stem finishes
      "M 115 241",

      // Retrace upward
      "C 121 224.5 128 204.4 134 181.6",

      // Reach x-height and begin hump
      "C 140 170.8 150 165.2 162 165.2",

      // Rounded top of hump
      "C 179 165.2 190 173.4 191 184.8",

      // Descend right side
      "C 192 197.5 185 212 182 223.9",

      // Reach baseline
      "C 179 235.4 181 241 189 241",

      // Exit tail
      "C 199 241 212 238.5 225 229",
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