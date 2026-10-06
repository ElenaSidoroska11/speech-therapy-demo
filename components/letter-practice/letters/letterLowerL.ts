import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase l — one stroke.
 *
 * Straight / upright version.
 *
 * Starts at the ascender line and travels straight vertically
 * downward. At the bottom it forms a larger, smoother rounded
 * turn before continuing into the original exit tail.
 *
 * Same path as the client design, shifted up so the stroke
 * does not cross baseline (line 3).
 */
export const letterLowerL: LetterDefinition = {
  id: "l",

  letter: "l",

  spokenName: "the letter L",

  acceptTranscripts: [
    "l",
    "el",
    "ell",
    "letter l",
    "the letter l",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Start at top / ascender line
      "M 112 56",

      // Straight vertical stem
      "C 112 102 112 150 112 186",

      // Continue straight downward
      "C 112 208 112 224 113 232",

      // Continue down before beginning the turn
      "C 114 239 117 243 122 245",

      // Larger, rounder semicircular bottom
      "C 128 248 136 246 143 241",

      // Smooth rounded rise into the original tail
      "C 150 236 155 229 159 221",

      // Original-style exit tail
      "C 161 216 163 210 164 204",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.18],
};