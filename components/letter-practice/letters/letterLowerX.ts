import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase x — two strokes.
 *
 * Stroke 1:
 * Starts on the left around x-height.
 * Curves upward and right over the top,
 * then bends downward through the centre
 * and sweeps left toward the baseline.
 *
 * Stroke 2:
 * Starts at the upper-right.
 * Curves inward and downward through the centre,
 * reaches the baseline with a rounded turn,
 * then sweeps upward/right into the exit tail.
 */

export const letterLowerX: LetterDefinition = {
  id: "x",

  letter: "x",

  spokenName: "the letter X",

  phonemeSound: "/sounds/x-phoneme.mp3",

  acceptTranscripts: [
    "x",
    "ex",
    "eks",
    "letter x",
    "the letter x",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start on the left
      "M 91 181",

      // Curve upward and right toward the top
      "C 102 167 113 160 124 161",

      // Rounded top arch
      "C 137 161 143 171 142 185",

      // Bend downward through the centre
      "C 141 203 131 220 118 230",

      // Sweep left toward the baseline
      "C 105 240 91 242 77 238",
    ].join(" "),

    [
      // Stroke 2 — start at upper-right
      "M 174 169",

      // Curve left/inward from the top
      "C 161 166 151 172 146 184",

      // Descend through the centre
      "C 140 197 138 216 139 228",

      // Rounded bottom turn at the baseline
      "C 140 238 146 242 154 239",

      // Sweep upward/right into the exit
      "C 163 235 171 225 180 215",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow 1 follows the upper arch.
  // Arrow 2 follows the downward second stroke.
  directionArrowFractions: [0.18, 0.25],
};