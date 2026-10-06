import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase h — two strokes.
 *
 * Stroke 1:
 * Starts at the top/ascender line and travels straight
 * downward to the baseline.
 *
 * Stroke 2:
 * Retraces upward along the stem to x-height,
 * forms the rounded hump, then descends straight
 * toward the baseline.
 *
 * At the bottom it forms a smooth rounded semicircle-like
 * turn before continuing into the exit tail.
 */
export const letterLowerH: LetterDefinition = {
  id: "h",
  letter: "h",
  spokenName: "the letter H",

  acceptTranscripts: [
    "h",
    "aitch",
    "letter h",
    "the letter h",
    "huh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     * Straight vertical stem.
     */
    [
      "M 82 59",
      "L 82 241",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Retrace upward → rounded hump →
     * straight downward section →
     * rounded semicircle bottom → exit tail.
     */
    [
      // Start at bottom of stroke 1
      "M 82 241",

      // Retrace straight upward
      "L 82 181",

      // Continue to x-height
      "L 82 164",

      // Smooth transition into hump
      "C 84 159 92 157 104 157",

      // Rounded hump
      "C 126 157 141 165 142 184",

      // Go almost straight down
      "C 142 199 142 216 142 226",

      // Begin rounded bottom
      "C 142 235 145 241 152 241",

      // Continue rounded semicircle-like turn
      "C 160 241 166 237 171 232",

      // Smooth upward/right exit
      "C 175 228 179 224 183 220",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.42],
};