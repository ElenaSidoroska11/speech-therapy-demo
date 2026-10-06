import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase z — two strokes.
 *
 * Stroke 1:
 * Starts on the upper-left near x-height.
 * Curves upward and right over the rounded top,
 * then bends downward and slightly left toward the baseline.
 *
 * Stroke 2:
 * Starts around the middle of the letter.
 * Curves upward/right to form the rounded hump,
 * then travels downward through the baseline
 * into the descender area.
 * Finishes with a large rounded curve sweeping left.
 */

export const letterLowerZ: LetterDefinition = {
  id: "z",

  letter: "z",

  spokenName: "the letter Z",

  phonemeSound: "/sounds/z-phoneme.mp3",

  acceptTranscripts: [
    "z",
    "zed",
    "zee",
    "letter z",
    "the letter z",
    "zuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at upper-left
      "M 94 175.4",

      // Curve upward toward x-height
      "C 103 162.8 113 156.5 123 157.6",

      // Rounded top arch
      "C 135 158.6 140 169.1 138 182.8",

      // Curve downward through the centre
      "C 136 197.5 129 212.2 121 225.8",

      // Finish around the normal baseline
      "C 118 231.1 115 234.2 112 236.3",
    ].join(" "),

    [
      // Stroke 2 — begin around the middle/baseline
      "M 112 236.3",

      // Rise right to create the rounded hump
      "C 120 222.7 128 215.3 137 215.3",

      // Round over the top-right of the hump
      "C 148 215.3 154 223.7 154 237.4",

      // Descend through the baseline
      "C 154 255.3 153 277.3 151 296.2",

      // Continue deep into descender area
      "C 149 313 145 325.6 137 333",

      // Round the bottom smoothly
      "C 129 340.3 117 343.5 104 342.4",

      // Long left-facing finishing sweep
      "C 92 342.4 81 339.3 72 335.1",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // 1: over the rounded top and downward
  // 2: around the hump and down into the descender
  directionArrowFractions: [0.18, 0.32],
};