import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive lowercase a — two strokes.
 *
 * Stroke 1:
 * Starts at the blue dot on the x-height line.
 * Travels left/counterclockwise around the oval and
 * returns to the same junction.
 *
 * Stroke 2:
 * Starts at the same blue dot, travels down to the baseline,
 * then curves smoothly upward/right into the exit tail.
 *
 * Same shape as the full-band a, scaled uniformly to sit
 * between midline (line 2) and baseline (line 3).
 */
export const letterA: LetterDefinition = {
  id: "a",
  letter: "a",
  spokenName: "the letter A",

  acceptTranscripts: [
    "a",
    "ay",
    "letter a",
    "the letter a",
    "uh",
    "ah",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Blue dot → left across top → down around oval →
     * baseline → back up → finish at blue dot.
     * Inset so the full stroke width stays between midline and baseline.
     */
    [
      "M 158.9 166.5",

      // Rounded top moving left (along midline)
      "C 145 160.5 125.8 160.5 110.7 167.1",

      // Left side
      "C 93.9 175 86.1 190.6 87.9 208",

      // Rounded bottom sitting on baseline (line 3)
      "C 89.6 225 98.7 237.5 112 239",

      // Bottom/right side
      "C 125.8 240 140.2 228 148.7 214",

      // Return smoothly to the blue dot
      "C 156.4 200.2 160 181.6 158.9 166.5",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Blue dot → downstroke → baseline → exit tail.
     */
    [
      "M 158.9 166.5",

      // Almost straight down, with slight cursive slant
      "C 158.2 181.6 156.4 199 154.6 216",

      // Reach baseline
      "C 153.4 228 154.1 237 160 239",

      // Rounded exit tail
      "C 167.3 240.5 176.9 232 185.9 221",
    ].join(" "),
  ],

  strokeWidth: 21,
  traceTolerance: 28,
  traceCoverage: 0.99,

  // Arrow 1 = oval
  // Arrow 2 = downward stem
  directionArrowFractions: [0.08, 0.20],
};
