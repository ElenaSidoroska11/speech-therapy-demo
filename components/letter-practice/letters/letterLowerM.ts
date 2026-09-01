import type { LetterDefinition } from "./types";

/**
 * Cursive (Victoria Modern Script) lowercase m — three strokes.
 *
 * Stroke 1:
 * Start near the baseline, travel upward, make the first
 * rounded hump, then descend to the baseline.
 *
 * Stroke 2:
 * Start at the bottom of the first downstroke, travel upward,
 * make the second rounded hump, then descend to the baseline.
 *
 * Stroke 3:
 * Start at the bottom of the second downstroke, travel upward,
 * make the third rounded hump, descend to the baseline,
 * then finish with a small cursive exit tail.
 *
 * Coordinates fit a 200×280 artboard.
 */
export const letterLowerM: LetterDefinition = {
  id: "m",
  letter: "m",
  spokenName: "the letter M",

  acceptTranscripts: [
    "m",
    "em",
    "letter m",
    "the letter m",
    "mmm",
    "muh",
  ],

  viewBox: "10 111 160 161",
  fitAspectRatio: 160 / 161,

  strokePaths: [
    // Stroke 1 — first stem + first rounded hump
    "M 28 258 C 30 232 33 198 35 168 C 36 151 39 137 48 134 C 59 130 68 139 69 153 C 70 169 64 190 62 211 C 60 230 59 246 60 258",

    // Stroke 2 — second stem + second rounded hump
    "M 60 258 C 62 230 65 196 67 166 C 68 149 72 137 81 134 C 92 130 101 139 102 153 C 103 169 97 190 95 211 C 93 231 93 247 96 258",

    // Stroke 3 — third stem + third rounded hump + exit tail
    "M 96 258 C 98 230 101 196 103 166 C 104 149 108 137 117 134 C 128 130 137 139 138 153 C 139 169 134 190 132 210 C 130 230 131 244 138 248 C 145 252 153 246 160 238",
  ],

  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,

  // Worksheet arrows 1, 2 and 3
  directionArrowFractions: [0.08, 0.08, 0.08],
};