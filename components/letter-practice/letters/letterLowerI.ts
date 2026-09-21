import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase i — two strokes.
 *
 * Stroke 1:
 * Starts at x-height (line 2), travels downward with a
 * slight leftward curve to the baseline, then curves
 * smoothly upward/right into the exit tail.
 *
 * Stroke 2:
 * A small dot centred above the stem, between
 * line 1 and line 2.
 *
 * Matches the worksheet reference:
 *   1 = stem + exit tail
 *   2 = dot
 */
export const letterLowerI: LetterDefinition = {
  id: "i",

  letter: "i",

  spokenName: "the letter I",

  acceptTranscripts: ["i", "eye", "letter i", "the letter i"],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Start on line 2 → descend → rounded bottom →
     * exit upward/right.
     *
     * The stem leans slightly left, matching the
     * worksheet reference.
     */
    [
      // Start exactly on x-height / line 2
      "M 108 164",

      // Descend with a subtle leftward slant
      "C 106 179 103 197 100 214",

      // Continue toward the baseline
      "C 98 225 98 231 102 234",

      // Rounded turn at the baseline
      "C 106 237 112 235 118 231",

      // Exit tail rises smoothly to the right
      "C 124 227 130 222 136 217",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Dot above the stem, clearly above line 2
     * (midline) so it does not touch stroke 1.
     * With strokeWidth 28, center at y=126 puts the
     * bottom of the round cap ~10 units above midline.
     *
     * Very short path + round linecap makes this
     * appear as the round orange dot in the reference.
     */
    ["M 111 126", "L 111.1 126"].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = downward stem
  // 2 = dot
  directionArrowFractions: [0.15, 0.5],
};
