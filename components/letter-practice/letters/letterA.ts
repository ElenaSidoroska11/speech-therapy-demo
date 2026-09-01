import type { LetterDefinition } from "./types";

/**
 * Cursive lowercase a — two strokes.
 *
 * Stroke 1:
 * Starts at the upper-right, travels counterclockwise around
 * the oval, and finishes just before the top-right junction.
 *
 * Stroke 2:
 * Starts at the top-right junction and travels straight down
 * to the baseline, then curves into the exit tail.
 */
export const letterA: LetterDefinition = {
  id: "a",
  letter: "a",
  spokenName: "the letter A",

  acceptTranscripts: ["a", "ay", "letter a", "the letter a", "uh", "ah"],

  // Include half the stroke (14) plus a little air so the ruling lines are visible.
  viewBox: "12 105 172 168",
  fitAspectRatio: 172 / 168,

  strokePaths: [
    "M 140 148 C 119 134 91 131 68 140 C 43 150 34 177 39 204 C 43 229 59 246 81 248 C 103 250 124 235 132 215 C 140 193 143 165 140 148",
    "M 140 148 C 139 172 137 196 135 218 C 133 235 133 245 140 249 C 148 253 158 247 166 238",
  ],

  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,

  // 1 = oval, 2 = downstroke
  directionArrowFractions: [0.08, 0.05],
};
