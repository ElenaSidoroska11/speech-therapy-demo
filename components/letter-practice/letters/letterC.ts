import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase c — one continuous stroke.
 *
 * Stroke 1:
 * Starts at the blue dot on the upper-right at x-height.
 * Moves left across the rounded top, curves counterclockwise
 * down the left side, rounds along the baseline, then curves
 * upward/right into the open ending.
 *
 * Same shape as the full-band c, scaled uniformly to sit
 * between midline (line 2) and baseline (line 3).
 */
export const letterC: LetterDefinition = {
  id: "c",
  letter: "c",
  spokenName: "the letter C",

  acceptTranscripts: [
    "c",
    "cee",
    "see",
    "letter c",
    "the letter c",
    "kuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start at blue dot — upper-right at x-height
      "M 148.4 166.3",

      // Move left across the rounded top
      "C 136.1 160.5 120.4 160.5 107.5 164.6",

      // Continue left and begin curving downward
      "C 91.2 169.8 81.3 180.9 79 196.1",

      // Down around the left side
      "C 76.6 212 82.5 228 93.5 235",

      // Round across the bottom sitting on baseline (line 3)
      "C 104.6 241 118.6 239 128.5 230",

      // Finish with the short upward/right open end
      "C 133.2 225 136.7 220 140.2 215",
    ].join(" "),
  ],

  strokeWidth: 21,
  traceTolerance: 28,
  traceCoverage: 0.99,

  // Arrow 1 near the beginning/top of the c
  directionArrowFractions: [0.1],
};
