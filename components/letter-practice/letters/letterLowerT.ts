import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase t — two strokes.
 *
 * Stroke 1:
 * Starts above line 2 (x-height) so the stem protrudes.
 * Travels downward with a slight leftward slant.
 * Reaches the baseline, curves smoothly around the bottom,
 * then rises diagonally to the right into the exit tail.
 *
 * Stroke 2:
 * A separate horizontal crossbar on line 2 (x-height),
 * drawn from left to right.
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
      // Stroke 1 — start above line 2 (x-height) so the stem protrudes
      "M 130 118",

      // Descend with a slight leftward slant
      "C 127 145 123 175 119 199",

      // Continue toward baseline
      "C 116 216 112 229 113 236",

      // Large rounded bottom turn
      "C 114 246 122 251 132 248",

      // Sweep upward and right
      "C 142 245 151 236 160 227",
    ].join(" "),

    [
      // Stroke 2 — crossbar on line 2 (midline / x-height), left → right
      "M 103 150",

      // Slightly softened horizontal stroke
      "C 120 150 139 150 158 150",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow 1: downward on main stroke
  // Arrow 2: rightward across crossbar
  directionArrowFractions: [0.15, 0.5],
};