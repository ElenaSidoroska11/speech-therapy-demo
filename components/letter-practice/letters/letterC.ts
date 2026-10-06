import type { LetterDefinition } from "./types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase c — one continuous stroke.
 *
 * Stroke 1:
 * Starts at the blue dot on the upper-right at x-height.
 * Moves left across the rounded top, curves counterclockwise
 * down the left side, rounds along the baseline, then curves
 * upward/right into the open ending.
 *
 * The start and end of the letter are vertically aligned.
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
      // Start — upper-right at x-height
      "M 148.4 161.7",

      // Rounded top
      "C 136.1 155.2 120.4 155.2 107.5 159.8",

      // Curve toward the left side
      "C 91.2 165.6 81.3 177.9 79 194.7",

      // Down around the left side
      "C 76.6 212.3 82.5 230.1 93.5 237.8",

      // Rounded bottom
      "C 104.6 244.5 119.8 242.3 131.2 232.3",

      // Open ending — aligned vertically with the start
      "C 138.2 226.5 143.7 220.5 148.4 215.7",
    ].join(" "),
  ],

  strokeWidth: 21,

  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  // Arrow 1 near the beginning/top of the c
  directionArrowFractions: [0.1],
};