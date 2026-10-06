import type { LetterDefinition } from "./types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase g — two strokes.
 *
 * Slightly straighter / more upright version.
 *
 * Stroke 1:
 * Starts at the blue dot on the upper-right at x-height.
 * Travels counterclockwise around the oval and returns
 * smoothly to the starting junction.
 *
 * Stroke 2:
 * Starts at the same blue dot, travels almost straight down
 * the right side, passes through the baseline into the
 * descender area, then curves into the leftward hook.
 */
export const letterLowerG: LetterDefinition = {
  id: "g",
  letter: "g",

  spokenName: "the letter G",

  acceptTranscripts: [
    "g",
    "gee",
    "letter g",
    "the letter g",
    "guh",
  ],

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
      "M 162.5 164.5",

      // Rounded top — slightly more upright
      "C 148.5 158.2 130.5 158.5 116.2 165.9",

      // Left side — brought slightly inward
      "C 101.2 174.5 94.5 191.2 95.2 208.5",

      // Rounded bottom of oval
      "C 96.0 225.8 104.5 237.5 117.0 240.0",

      // Right side
      "C 130.0 242.0 143.0 230.5 151.0 214.5",

      // Return smoothly to blue dot
      "C 159.0 198.5 163.5 179.0 162.5 164.5",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Blue dot → straighter downstroke →
     * through baseline → descender →
     * rounded hook toward the left.
     */
    [
      // Start at same blue dot
      "M 162.5 164.5",

      // Straighter downward movement
      "C 162.0 184.5 160.8 206.5 159.0 229.0",

      // Continue almost vertically through baseline
      "C 157.5 250.0 156.0 271.5 154.0 291.5",

      // Descender — delay the leftward curve
      "C 152.5 307.0 148.5 319.5 141.5 327.0",

      // Rounded bottom hook
      "C 133.0 335.5 120.5 338.5 108.0 336.0",

      // Leftward finish
      "C 99.5 334.0 92.0 330.5 85.5 326.5",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  // Arrow 1 = oval
  // Arrow 2 = descending stroke
  directionArrowFractions: [0.08, 0.22],
};