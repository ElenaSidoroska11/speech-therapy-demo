import type { LetterDefinition } from "./types";

import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Victoria Modern Script lowercase p — two strokes.
 *
 * Straight / upright version.
 *
 * Stroke 1:
 * Starts at x-height and travels STRAIGHT vertically downward,
 * passing the baseline and continuing to the descender line.
 *
 * Stroke 2:
 * Starts slightly to the RIGHT of stroke 1, leaving
 * a small visible gap. It rises into the rounded hump.
 *
 * After the hump, the right side travels STRAIGHT downward
 * toward the baseline without curving to the left.
 *
 * At the baseline it forms a smooth rounded turn,
 * then continues into a gently angled exit tail.
 *
 * Reference:
 * 1 = straight descending stem
 * 2 = upright rounded hump + rounded exit tail
 */

export const letterLowerP: LetterDefinition = {
  id: "p",

  letter: "p",

  spokenName: "the letter P",

  acceptTranscripts: [
    "p",
    "pee",
    "letter p",
    "the letter p",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Completely straight / vertical stem.
     */
    [
      // Start at x-height
      "M 88 148",

      // Straight vertical descent
      "C 88 172 88 200 88 228",

      // Continue straight below baseline
      "C 88 256 88 284 88 310",

      // Finish near descender line
      "C 88 324 88 336 88 344",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Rounded hump → straight downward section →
     * rounded bottom → angled exit tail.
     */
    [
      // Start slightly to the right of stroke 1
      "M 94 193.1",

      // Rise toward x-height
      "C 104 174 116 162.5 132 162.5",

      // Rounded top of hump
      "C 146 162.5 155 167.5 158 175.5",

      // Finish the rounded upper-right part
      "C 160 181 160 187 160 193",

      // Go STRAIGHT downward — no movement to the left
      "L 160 226",

      // Continue straight almost to baseline
      "L 160 232",

      // Smooth rounded turn at the bottom
      "C 160 237 163 240 168 240",

      // Continue the rounded transition toward the right
      "C 175 240 181 235 186 230",

      // Gently angled exit tail
      "C 190 226 194 222 198 218",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = descending stem
  // 2 = rounded hump
  directionArrowFractions: [0.16, 0.28],
};