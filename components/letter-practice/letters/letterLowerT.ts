import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase t — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts above line 2 (x-height).
 * Travels STRAIGHT vertically downward toward the baseline.
 * At the bottom it forms a smooth rounded turn,
 * then finishes with the original exit tail to the right.
 *
 * Stroke 2:
 * A separate straight horizontal crossbar on line 2,
 * drawn from left to right.
 *
 * The cursive/slanted stem has been removed.
 */
export const letterLowerT: LetterDefinition = {
  id: "t",

  letter: "t",

  spokenName: "the letter T",

  phonemeSound: "/sounds/t-phoneme.mp3",

  acceptTranscripts: [
    "t",
    "tee",
    "letter t",
    "the letter t",
    "tuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start above line 2
      "M 130 118",

      // Completely straight vertical descent
      "C 130 145 130 175 130 199",

      // Continue straight toward baseline
      "C 130 216 130 229 130 236",

      // Smooth rounded bottom turn
      "C 130 245 136 249 144 247",

      // Smooth exit tail upward/right
      "C 151 245 157 237 163 228",
    ].join(" "),

    [
      // Stroke 2 — straight horizontal crossbar
      "M 103 150",

      // Left → right, completely horizontal
      "C 121 150 140 150 159 150",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow 1: downward on main stroke
  // Arrow 2: rightward across crossbar
  directionArrowFractions: [0.15, 0.5],
};