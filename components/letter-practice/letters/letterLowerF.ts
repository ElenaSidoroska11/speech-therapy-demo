import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase f — two strokes.
 *
 * Stroke 1:
 * Starts at the blue dot near the top/ascender line.
 * Curves left into the tall stem and travels downward
 * through the baseline to the descender line.
 *
 * Stroke 2:
 * Crossbar on the midline — starts left of the stem and
 * sweeps right/upward across it.
 *
 * Spans topline (line 1) → bottomline (line 4).
 */
export const letterLowerF: LetterDefinition = {
  id: "f",
  letter: "f",
  spokenName: "the letter F",

  acceptTranscripts: [
    "f",
    "ef",
    "eff",
    "letter f",
    "the letter f",
    "fff",
    "fuh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Blue dot → curve left → tall stem → descender (line 4).
     */
    [
      // Start at blue dot
      "M 167.8 72.2",

      // Rounded top moving left
      "C 149.1 66 130.5 70.4 118.9 83.8",

      // Curve into the tall stem
      "C 106.4 98.9 102 122 98.4 147.8",

      // Continue down through x-height / baseline
      "C 94.9 176.3 90.4 210.1 86 243",

      // Reach the descender line
      "C 82.4 271.5 78 302.6 73.5 332",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Crossbar just below the midline (line 2).
     */
    [
      "M 68.2 198.3",

      // Approach/cross the stem
      "C 85.1 194.7 102.9 190.3 119.8 185",

      // Finish slightly higher on the right
      "C 131.3 181.4 142 177.8 150.9 174.3",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  // Arrow 1 = downward main stroke
  // Arrow 2 = cross stroke
  directionArrowFractions: [0.12, 0.15],
};
