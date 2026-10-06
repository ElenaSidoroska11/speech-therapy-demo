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
      "M 102 157.5",

      // Downstroke, leaning gently left
      "C 99 178 95 203 93 221.1",

      // Continue into the rounded bottom
      "C 91 234.8 96 242.7 105 243.9",

      // Wide smooth bottom curve
      "C 117 245 128 235.9 138 221.1",

      // Sweep upward/right
      "C 150 204.1 158 180.2 164 157.5",
    ].join(" "),

    [
      // Stroke 2 — short finishing stroke at top-right
      "M 164 157.5",

      // Small rightward finishing curve
      "C 172 158.6 179 158.6 186 157.5",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow 1: downward on the left side
  // Arrow 2: along the short finishing stroke
  directionArrowFractions: [0.13, 0.5],
};