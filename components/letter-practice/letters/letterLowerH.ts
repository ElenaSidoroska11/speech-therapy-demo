import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase h — two strokes.
 *
 * Stroke 1:
 * Starts at the top/ascender line and travels downward
 * with a slight leftward slant to the baseline.
 * Spans line 1 → line 3.
 *
 * Stroke 2:
 * Starts at the bottom of stroke 1, retraces upward along
 * the same stem to x-height, forms the rounded hump,
 * descends to the baseline, then curves upward/right
 * into the exit tail.
 * Hump spans line 2 → line 3.
 *
 * Same design as the hand-tuned paths; Y inset so visible
 * ink stays on/inside the guide lines.
 */
export const letterLowerH: LetterDefinition = {
  id: "h",
  letter: "h",
  spokenName: "the letter H",

  acceptTranscripts: [
    "h",
    "aitch",
    "letter h",
    "the letter h",
    "huh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Top blue dot → baseline (line 1 → line 3).
     * Slight leftward slant like the worksheet.
     */
    [
      "M 112 66",
      "C 107 93.4 101 123.4 95 153.4",
      "C 89 184.3 82 211.7 76 234",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Bottom → retrace upward → x-height →
     * rounded hump → down → exit tail
     * (line 2 → line 3).
     */
    [
      // Start exactly where stroke 1 finishes
      "M 76 234",

      // Retrace UP along the same stem
      "C 82 218.8 89 200.2 95 179.2",

      // Arrive at x-height (line 2) and move into hump
      "C 101 169.2 111 164 123 164",

      // Rounded hump under line 2
      "C 140 164 151 171.6 152 182.1",

      // Right side of hump descends
      "C 153 193.8 146 207.2 143 218.2",

      // Reach baseline (line 3)
      "C 140 228.8 142 234 150 234",

      // Smooth exit tail up/right
      "C 160 234 173 231.7 186 222.9",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,
  traceCoverage: 0.99,

  // 1 = downward stem
  // 2 = hump
  directionArrowFractions: [0.12, 0.42],
};
