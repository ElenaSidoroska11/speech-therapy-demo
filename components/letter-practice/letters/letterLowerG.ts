import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase g — two strokes.
 *
 * Stroke 1:
 * Starts at the blue dot on the upper-right at x-height.
 * Travels counterclockwise around the oval and returns
 * smoothly to the starting junction.
 *
 * Stroke 2:
 * Starts at the same blue dot, travels down the right side,
 * passes through the baseline into the descender area,
 * then curves around into a large leftward hook.
 *
 * Same path design as before, uniformly scaled (X and Y) so
 * proportions stay the same and ink spans line 2 → line 4.
 */
export const letterLowerG: LetterDefinition = {
  id: "g",
  letter: "g",
  spokenName: "the letter G",

  acceptTranscripts: ["g", "gee", "letter g", "the letter g", "guh"],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Blue dot → left around top →
     * down around oval → baseline →
     * back up to blue dot.
     */
    [
      // Start at blue dot on x-height
      "M 162.5 170.9",

      // Move left across rounded top (line 2)
      "C 146.7 164 126.9 164.7 111.1 172.2",

      // Down around left side
      "C 94.6 180.5 86.4 196.2 87.8 212.7",

      // Rounded bottom of oval (near line 3)
      "C 89.1 229.1 98.7 239.4 111.8 240.8",

      // Come around right side
      "C 125.5 242.2 139.9 231.9 148.8 217.5",

      // Return smoothly to blue dot
      "C 158.4 203.1 163.9 184.6 162.5 170.9",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Blue dot → down right side →
     * through baseline → descender →
     * rounded hook toward the left.
     */
    [
      // Start at same blue dot
      "M 162.5 170.9",

      // Downstroke
      "C 160.5 189.4 158.4 209.9 155.7 230.5",

      // Pass through baseline
      "C 152.9 249.7 150.9 269.6 148.1 288.1",

      // Continue into descender
      "C 146.1 303.2 141.3 314.9 133.7 321.7",

      // Round the bottom of the hook (line 4)
      "C 124.8 329.9 111.8 332 98.7 329.3",

      // Finish with long leftward sweep
      "C 89.8 327.2 82.3 323.8 76.1 320.3",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  // Arrow 1 = oval
  // Arrow 2 = descending stroke
  directionArrowFractions: [0.08, 0.22],
};
