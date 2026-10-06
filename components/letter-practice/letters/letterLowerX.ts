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
      "M 91 178",

      // Curve upward and right toward the top
      "C 102 162.7 113 155 124 156.1",

      // Rounded top arch
      "C 137 156.1 143 167.1 142 182.4",

      // Bend downward through the centre
      "C 141 202.2 131 220.9 118 231.8",

      // Sweep left toward the baseline
      "C 105 242.8 91 245 77 240.6",
    ].join(" "),

    [
      // Stroke 2 — start at upper-right
      "M 174 164.9",

      // Curve left/inward from the top
      "C 161 161.6 151 168.2 146 181.3",

      // Descend through the centre
      "C 140 195.6 138 216.5 139 229.6",

      // Rounded bottom turn at the baseline
      "C 140 240.6 146 245 154 241.7",

      // Sweep upward/right into the exit
      "C 163 237.3 171 226.3 180 215.4",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // Arrow 1 follows the upper arch.
  // Arrow 2 follows the downward second stroke.
  directionArrowFractions: [0.18, 0.25],
};