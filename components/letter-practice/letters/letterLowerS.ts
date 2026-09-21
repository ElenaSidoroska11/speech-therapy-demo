import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase s — one continuous stroke.
 *
 * Stroke 1:
 * Starts at the blue dot on the upper-right at x-height.
 * Moves left and slightly upward into the top curve,
 * curls down through the centre, swings right to form
 * the lower bowl, then curves back left along the baseline.
 *
 * Same shape as the full-band s, scaled uniformly to sit
 * between midline (line 2) and baseline (line 3).
 */
export const letterLowerS: LetterDefinition = {
  id: "s",
  letter: "s",
  spokenName: "the letter S",

  phonemeSound: "/sounds/s-phoneme.mp3",

  acceptTranscripts: [
    "s",
    "es",
    "ess",
    "letter s",
    "the letter s",
    "sss",
    "suh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start at blue dot on x-height
      "M 151.4 165.4",

      // Move left across the top
      "C 139.2 161.1 124.7 160.5 113.2 164.1",

      // Rounded upper-left curve
      "C 101.6 167.8 96.8 175.7 99.2 183.5",

      // Curve inward/right through the middle
      "C 101.6 190.8 112 196.3 122.3 200.5",

      // Continue right to create the belly of the S
      "C 134.4 206 139.8 213.2 136.8 221.7",

      // Large rounded lower curve
      "C 133.8 230.8 122.9 236.3 109.5 236.9",

      // Finish left along the baseline
      "C 98 237.5 88.3 235.1 81.6 232.6",
    ].join(" "),
  ],

  strokeWidth: 21,
  traceTolerance: 20,
  traceCoverage: 0.99,

  // Arrow 1 near the upper-left turn
  directionArrowFractions: [0.1],
};
