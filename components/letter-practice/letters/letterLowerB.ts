import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase b — one continuous stroke.
 *
 * Starts at the ascender line, travels down the stem to the baseline,
 * curves up through an open bowl to x-height, then finishes with a
 * short horizontal exit flick to the right (worksheet-style join).
 *
 * Same path design as before, uniformly scaled so the visible ink
 * (path ± half stroke) stays on/inside line 1 and line 3.
 */
export const letterLowerB: LetterDefinition = {
  id: "b",
  letter: "b",
  spokenName: "the letter B",
  acceptTranscripts: [
    "b",
    "bee",
    "be",
    "letter b",
    "the letter b",
    "buh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,
  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    // Stem down → open bowl up to x-height → exit continues right under midline
    [
      // Nearly vertical stem — no left heel at the baseline
      "M 102 66",
      "L 100 222",
      // Curve into baseline (line 3) and through the open bowl
      "C 100 238 124 238 148 210",
      "C 166 186 172 172 174 164",
      // Exit continues from the bowl, under line 2
      "C 176 160 186 160 200 162",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,
  traceTolerance: 36,
  traceCoverage: 0.99,

  // 1 = down stem, 2 = up through bowl / exit
  directionArrowFractions: [0.12, 0.58],
};
