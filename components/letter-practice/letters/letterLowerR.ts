import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase r — two strokes.
 *
 * LOWER HALF:
 * Stroke 1 and Stroke 2 overlap and form
 * one completely straight vertical stem.
 *
 * UPPER HALF:
 * Stroke 1 curves toward the LEFT (unchanged).
 * Stroke 2 goes straight first, then slowly drifts
 * to the RIGHT, leaving more space between the strokes,
 * and forms the r tail.
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
     * STROKE 1 (unchanged)
     */
    [
      // Top-left starting point
      "M 77 160",

      // Move right toward centre
      "C 83 155 90 153 96 155",

      // Smooth curve into centre
      "C 100 158 101 164 100 171",

      // Enter the shared vertical section
      "C 100 183 100 194 100 206",

      // Completely straight lower stem
      "C 100 218 100 231 100 243",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Starts at the bottom, goes straight up,
     * then bends to the right so the gap
     * to stroke 1 widens gradually.
     */
    [
      // Same bottom point
      "M 100 243",

      // Straight upward (shared with stroke 1)
      "C 100 235 100 227 100 219",

      // Slow drift to the right begins
      "C 100 205 104 192 110 181",

      // Continues rightward and upward
      "C 116 170 124 160 133 154",

      // Rounded upper shoulder
      "C 138 150 144 150 148 155",

      // Small rounded dip
      "C 152 160 155 165 160 165",

      // Right-facing tail
      "C 166 165 172 160 177 155",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  previewScale: 0.7,

  traceTolerance: 36,

  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.36],
};