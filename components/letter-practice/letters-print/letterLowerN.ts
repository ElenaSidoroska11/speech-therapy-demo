import type { LetterDefinition } from "../letters/types";
import {
  LOWERCASE_ARTBOARD,
  lowercaseRulingLines,
} from "../letters/artboard";

/**
 * Standard printed lowercase "n"
 *
 * Every stroke starts at the baseline, like writing by hand.
 *
 * STROKE 1:
 * Left stem. Starts at the baseline and goes up to x-height.
 *
 * STROKE 2:
 * Arch. Starts at the baseline of the right leg, goes up,
 * arches over to the left and ends on the left stem.
 */
export const letterLowerN: LetterDefinition = {
  id: "n",
  letter: "n",
  spokenName: "the letter N",

  acceptTranscripts: [
    "n",
    "en",
    "enn",
    "letter n",
    "the letter n",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — LEFT STEM
     * Starts at the baseline and goes up to x-height.
     */
    [
      "M 100 250",
      "L 100 159",
    ].join(" "),

    /**
     * STROKE 2 — ARCH
     * Starts at the baseline of the right leg, goes up,
     * arches over to the left and ends on the stem.
     */
    [
      "M 160 250",
      "L 160 192",
      "C 160 172 151 159 133 159",
      "C 116 159 102 176 100 200",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};