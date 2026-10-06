import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive lowercase a — two strokes.
 *
 * Stroke 1:
 * Starts at the blue dot near the x-height line.
 * Travels left/counterclockwise around the oval and
 * returns to the same junction.
 *
 * Stroke 2:
 * Starts at the same blue dot, travels down to the baseline,
 * then curves smoothly upward/right into the exit tail.
 *
 * Midway between a fully inset path (ink inside the band)
 * and a path-centerline flush on midline (line 2) /
 * baseline (line 3).
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
     */
    [
      "M 158.9 162",

      // Rounded top moving left (near midline)
      "C 145 155.3 125.8 155.3 110.7 162.6",

      // Left side
      "C 93.9 171.4 86.1 188.8 87.9 208.1",

      // Rounded bottom near baseline (line 3)
      "C 89.6 227 98.7 240.9 112 242.6",

      // Bottom/right side
      "C 125.8 243.7 140.2 230.4 148.7 214.8",

      // Return smoothly to the blue dot
      "C 156.4 199.4 160 178.7 158.9 162",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Blue dot → downstroke → baseline → exit tail.
     */
    [
      "M 158.9 162",

      // Almost straight down, with slight cursive slant
      "C 158.2 178.7 156.4 198.1 154.6 217",

      // Reach near baseline
      "C 153.4 230.4 154.1 240.4 160 242.6",

      // Rounded exit tail
      "C 167.3 244.3 176.9 234.8 185.9 222.6",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,
  traceTolerance: 28,
  traceCoverage: 0.99,

  // Arrow 1 = oval
  // Arrow 2 = downward stem
  directionArrowFractions: [0.08, 0.20],
};
