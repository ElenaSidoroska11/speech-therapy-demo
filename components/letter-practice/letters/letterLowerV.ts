import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase v — two strokes.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Travels downward with a slight leftward slant,
 * forms a wide rounded bottom at the baseline,
 * then sweeps upward/right back to x-height.
 *
 * Stroke 2:
 * Starts at the top-right end of the main stroke
 * and creates the short finishing stroke to the right.
 */

export const letterLowerV: LetterDefinition = {
  id: "v",

  letter: "v",

  spokenName: "the letter V",

  phonemeSound: "/sounds/v-phoneme.mp3",

  acceptTranscripts: [
    "v",
    "vee",
    "letter v",
    "the letter v",
    "vuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at x-height on the left
      "M 102 165",

      // Downstroke, leaning gently left
      "C 99 183 95 205 93 221",

      // Continue into the rounded bottom
      "C 91 233 96 240 105 241",

      // Wide smooth bottom curve
      "C 117 242 128 234 138 221",

      // Sweep upward/right
      "C 150 206 158 185 164 165",
    ].join(" "),

    [
      // Stroke 2 — short finishing stroke at top-right
      "M 164 165",

      // Small rightward finishing curve
      "C 172 166 179 166 186 165",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow 1: downward on the left side
  // Arrow 2: along the short finishing stroke
  directionArrowFractions: [0.13, 0.5],
};