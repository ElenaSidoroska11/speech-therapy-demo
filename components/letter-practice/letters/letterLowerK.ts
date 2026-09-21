import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase k — two strokes.
 *
 * Stroke 1:
 * Starts at the top/ascender line and travels downward
 * with a slight leftward slant to the baseline.
 *
 * Stroke 2:
 * Starts near the stem at x-height, curves into a
 * rounded loop, approaches the stem at the waist with
 * a small gap (not touching), then sweeps down and
 * right into the exit tail.
 *
 * Reference:
 * 1 = long downward stem
 * 2 = loop + lower arm + exit tail
 */
export const letterLowerK: LetterDefinition = {
  id: "k",

  letter: "k",

  spokenName: "the letter K",

  acceptTranscripts: [
    "k",
    "kay",
    "letter k",
    "the letter k",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1
     *
     * Ascender line → baseline.
     * Slight leftward slant like the worksheet.
     */
    [
      // Start at top / ascender line
      "M 108 66",

      // Long descending stem
      "C 104 94 100 124 96 154",

      // Continue toward baseline
      "C 92 184 86 214 80 234",
    ].join(" "),

    /**
     * STROKE 2
     *
     * Start near the stem at x-height → rise into
     * rounded loop → smooth open waist (small gap from
     * the stem, no sharp pinch) → lower arm → exit tail.
     */
    [
      // Start near the stem, around x-height / line 2
      "M 94 168",

      // Sweep upward/right into the top of the loop
      "C 108 156 124 152 140 158",

      // Rounded top/right side
      "C 154 164 158 176 152 188",

      // Come left toward the waist — stay off the stem
      "C 146 200 134 206 122 202",

      // Smooth open turn into the lower arm (no cusp)
      "C 114 199 116 208 128 220",

      // Rounded lower section toward baseline
      "C 140 232 152 238 164 237",

      // Exit tail rises to the right
      "C 176 236 188 228 198 218",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = downward stem
  // 2 = loop
  directionArrowFractions: [0.16, 0.30],
};