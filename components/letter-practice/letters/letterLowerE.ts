import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase e — one continuous stroke.
 *
 * Handwriting order (worksheet-style):
 * 1. Start at the blue dot mid-height (between lines 2 and 3).
 * 2. Draw right across the crossbar.
 * 3. Loop counterclockwise up to the midline, over the top, and
 *    down the left side (crossing the crossbar).
 * 4. Curve down around the lower bowl to the baseline.
 * 5. Finish with a short upward/right exit flick.
 *
 * Sized to the x-height band: midline (line 2) → baseline (line 3).
 */
export const letterLowerE: LetterDefinition = {
  id: "e",
  letter: "e",
  spokenName: "the letter E",

  acceptTranscripts: [
    "e",
    "ee",
    "letter e",
    "the letter e",
    "eh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    [
      // Blue dot — mid-height, ready to draw right
      "M 90 200",

      // Crossbar: straight-ish right across the middle
      "C 105 200 120 200 132 198",

      // Up into the upper-right, then counterclockwise over the top
      "C 145 196 152 182 148 170",
      "C 144 160.5 128 158 112 164",

      // Down the left side, crossing back through the crossbar level
      "C 96 170 86 184 88 200",

      // Lower bowl down toward the baseline (same shape, shifted to sit on line 3)
      "C 90 219 95 232 110 239",

      // Round along the baseline
      "C 122 241.5 136 238 144 230",

      // Very short upward/right exit flick — keep open, not joined
      "C 148 226 150 224 151 222",
    ].join(" "),
  ],

  strokeWidth: 21,
  traceTolerance: 28,
  traceCoverage: 0.99,

  // Arrow near the start of the rightward crossbar
  directionArrowFractions: [0.08],
};
