import type { LetterDefinition } from "../letters/types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "../letters/artboard";

/**
 * Standard printed lowercase "f"
 *
 * STROKE 1:
 * Hooked stem. Starts at the upper-right terminal, curves over
 * the top to the left, then runs straight down to the baseline.
 *
 * STROKE 2:
 * Crossbar. A short horizontal line at x-height.
 */
export const letterLowerF: LetterDefinition = {
  id: "f",
  letter: "f",
  spokenName: "the letter F",

  acceptTranscripts: ["f", "ef", "eff", "letter f", "the letter f"],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — HOOKED STEM (start moved left)
     */
    [
      // Upper terminal of the hook, now closer to the stem
      "M 138 127",

      // Curve over the top toward the stem
      "C 133 120 127 116 120 116",

      // Down into the stem
      "C 109 116 103 125 103 140",

      // Straight stem to the baseline
      "L 103 250",
    ].join(" "),

    /**
     * STROKE 2 — CROSSBAR (moved down)
     */
    ["M 78 165", "L 140 165"].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};
