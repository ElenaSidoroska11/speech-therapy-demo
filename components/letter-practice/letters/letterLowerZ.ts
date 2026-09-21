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
      "M 94 181",

      // Curve upward toward x-height
      "C 103 169 113 163 123 164",

      // Rounded top arch
      "C 135 165 140 175 138 188",

      // Curve downward through the centre
      "C 136 202 129 216 121 229",

      // Finish around the normal baseline
      "C 118 234 115 237 112 239",
    ].join(" "),

    [
      // Stroke 2 — begin around the middle/baseline
      "M 112 239",

      // Rise right to create the rounded hump
      "C 120 226 128 219 137 219",

      // Round over the top-right of the hump
      "C 148 219 154 227 154 240",

      // Descend through the baseline
      "C 154 257 153 278 151 296",

      // Continue deep into descender area
      "C 149 312 145 324 137 331",

      // Round the bottom smoothly
      "C 129 338 117 341 104 340",

      // Long left-facing finishing sweep
      "C 92 340 81 337 72 333",
    ].join(" "),
  ],

  strokeWidth: 21,

  traceTolerance: 20,

  traceCoverage: 0.99,

  // 1: over the rounded top and downward
  // 2: around the hump and down into the descender
  directionArrowFractions: [0.18, 0.32],
};