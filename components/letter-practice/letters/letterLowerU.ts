import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase u — two strokes.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Moves downward with a slight leftward slant,
 * rounds smoothly along the baseline,
 * then rises back up to x-height.
 *
 * Stroke 2:
 * Starts at x-height at the top of the second downstroke.
 * Moves downward with a slight leftward slant,
 * rounds along the baseline,
 * then curves upward/right into the exit tail.
 */

export const letterLowerU: LetterDefinition = {
  id: "u",

  letter: "u",

  spokenName: "the letter U",

  phonemeSound: "/sounds/u-phoneme.mp3",

  acceptTranscripts: [
    "u",
    "you",
    "letter u",
    "the letter u",
    "uh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at x-height
      "M 103 165",

      // Downstroke, leaning slightly left
      "C 100 183 96 207 94 222",

      // Rounded first bottom
      "C 92 233 96 239 104 240",
      "C 114 241 123 233 130 222",

      // Rise smoothly to the top of the second stem
      "C 139 207 145 185 150 165",
    ].join(" "),

    [
      // Stroke 2 — start at x-height
      "M 150 165",

      // Second downstroke, leaning slightly left
      "C 147 184 143 207 141 222",

      // Rounded second bottom
      "C 139 233 143 239 151 240",

      // Turn upward/right into the exit tail
      "C 160 241 169 234 179 224",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Both arrows point downward near the beginning
  // of their respective strokes.
  directionArrowFractions: [0.13, 0.16],
};