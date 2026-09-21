import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase j — two strokes.
 *
 * Stroke 1:
 * Starts at x-height (line 2), descends with a slight
 * leftward slant through the baseline, continues to the
 * descender (line 4), then forms a broad rounded hook
 * toward the left.
 *
 * Stroke 2:
 * Small dot above the stem, clearly above line 2 so it
 * does not touch stroke 1.
 *
 * Reference:
 *   1 = descending stem + bottom hook (line 2 → line 4)
 *   2 = dot
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
     * Start at line 2 → descend through baseline →
     * reach line 4 → broad hook left.
     */
    [
      // Start exactly at x-height / line 2
      "M 116 164",

      // Long descending stem with slight leftward slant
      "C 113 189 110 218 107 245",

      // Continue through baseline toward line 4
      "C 104 272 100 294 94 308",

      // Begin the large rounded bottom turn on line 4
      "C 87 323 77 329 64 331",

      // Sweep left along the bottom — end cleanly (no upward tip)
      "C 51 332 40 330 32 326",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Dot above the stem, clearly above line 2
     * (midline) so it does not touch stroke 1.
     * With strokeWidth 28, center at y=126 puts the
     * bottom of the round cap ~10 units above midline.
     */
    [
      "M 119 126",
      "L 119.1 126",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = downward stem
  // 2 = dot
  directionArrowFractions: [0.27, 0.5],
};
