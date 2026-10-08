import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase v — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height on the left.
 * Travels STRAIGHT vertically downward,
 * forms a smooth rounded bottom at the baseline,
 * then rises upward/right back to x-height.
 *
 * Stroke 2:
 * Starts at the top-right end of the main stroke
 * and creates the short finishing stroke to the right.
 */

export const letterLowerV: LetterDefinition = {
  id: "v",

  letter: "v",

  spokenName: "the letter V",

  phonemeSound: "/sounds/v-phoneme.mp3",

  acceptTranscripts: [
    "v",
    "vee",
    "letter v",
    "the letter v",
    "vuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Stroke 1 — start at x-height on the left
      "M 102 157.5",

      // Straight vertical downstroke
      "C 102 178 102 203 102 221.1",

      // Smooth rounded bottom
      "C 102 234.8 107 242.7 116 243.9",

      // Wide rounded turn
      "C 128 245 139 235.9 148 221.1",

      // Smooth upright rise toward x-height
      "C 158 204.1 163 180.2 164 157.5",
    ].join(" "),

    [
      // Stroke 2 — short finishing stroke at top-right
      "M 164 157.5",

      // Small horizontal finishing curve
      "C 172 158.6 179 158.6 186 157.5",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 20,

  traceCoverage: 0.99,

  directionArrowFractions: [0.13, 0.5],
};