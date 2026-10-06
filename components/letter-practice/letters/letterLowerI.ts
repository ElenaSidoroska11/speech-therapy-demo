import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase i — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height (line 2), travels straight downward
 * to the baseline, forms a larger rounded bottom,
 * then continues into the original exit tail.
 *
 * Stroke 2:
 * A small dot centred directly above the upright stem,
 * between line 1 and line 2.
 */
export const letterLowerI: LetterDefinition = {
  id: "i",

  letter: "i",

  spokenName: "the letter I",

  acceptTranscripts: [
    "i",
    "eye",
    "letter i",
    "the letter i",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Straight stem.
     * Larger rounded bottom.
     * Original exit-tail design preserved.
     */
    [
      // Start exactly on x-height / line 2
      "M 108 157",

      // Straight vertical descent
      "C 108 176 108 197 108 216",

      // Continue straight down before the rounded turn
      "C 108 228 108 236 111 240",

      // Larger and smoother rounded bottom
      "C 114 245 120 246 125 243",

      // Continue smoothly into the original tail
      "C 128 241 130 238 132 235",

      // Original exit-tail direction and finish
      "C 134 232 137 226 139 220",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Dot positioned directly above the straight stem.
     */
    [
      "M 108 126",
      "L 108.1 126",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.15, 0.5],
};