import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase r — two strokes.
 *
 * LOWER HALF:
 * Stroke 1 and Stroke 2 overlap / stay connected.
 *
 * UPPER HALF:
 * The strokes divide.
 * Stroke 1 goes LEFT.
 * Stroke 2 goes RIGHT and forms the r tail.
 */

export const letterLowerR: LetterDefinition = {
  id: "r",

  letter: "r",

  spokenName: "the letter R",

  acceptTranscripts: [
    "r",
    "are",
    "ar",
    "letter r",
    "the letter r",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Starts at the TOP LEFT.
     * Curves toward the centre.
     * Then descends along the shared lower stem.
     */
    [
      // Top-left starting point
      "M 77 158",

      // Move RIGHT from the starting point
      "C 83 153 90 151 96 153",

      // Curve into the centre
      "C 101 156 102 162 100 169",

      // Enter shared section
      "C 97 180 94 191 91 202",

      // Shared lower stem
      "C 88 214 85 226 82 238",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Starts at the SAME bottom area.
     * Follows the shared lower stem upward.
     *
     * Around halfway it DIVIDES from stroke 1
     * and travels toward the RIGHT.
     */
    [
      // Same bottom point
      "M 82 238",

      // Follow SAME lower stem upward
      "C 85 226 88 214 91 202",

      // Continue shared section
      "C 94 191 97 180 100 169",

      // DIVISION STARTS HERE
      // Stroke 2 now moves RIGHT
      "C 104 158 109 151 115 149",

      // Rounded upper shoulder
      "C 121 147 126 150 129 155",

      // Small dip
      "C 132 160 136 163 140 163",

      // Right-facing tail
      "C 146 163 151 158 156 153",

      // Final upward/right flick
      "C 160 150 164 150 168 152",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.36],
};