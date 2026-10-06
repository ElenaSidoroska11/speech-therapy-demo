import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase j — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height (line 2) and travels vertically downward
 * through the baseline to the descender (line 4), then forms
 * the original broad rounded hook toward the left.
 *
 * Stroke 2:
 * Small dot centred directly above the upright stem.
 */
export const letterLowerJ: LetterDefinition = {
  id: "j",

  letter: "j",

  spokenName: "the letter J",

  acceptTranscripts: [
    "j",
    "jay",
    "letter j",
    "the letter j",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Straight vertical stem:
     * line 2 → baseline → line 4 → rounded hook left.
     */
    [
      // Start exactly at x-height / line 2
      "M 116 157",

      // Straight vertical descent
      "C 116 184 116 216 116 245",

      // Continue straight through baseline toward line 4
      "C 116 274 116 299 110 314",

      // Begin broad rounded bottom turn
      "C 104 329 93 336 79 338",

      // Sweep left along the bottom
      "C 64 340 48 337 36 332",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Dot directly above the straight stem.
     */
    [
      "M 116 126",
      "L 116.1 126",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = downward upright stem
  // 2 = dot
  directionArrowFractions: [0.27, 0.5],
};