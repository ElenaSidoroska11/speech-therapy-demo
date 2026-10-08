import type { LetterDefinition } from "../letters/types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "../letters/artboard";

/**
 * Standard printed lowercase "a" (double-storey)
 *
 * STROKE 1:
 * Bowl. Starts on the stem, sweeps left, rounds the bottom
 * and returns to the stem.
 *
 * STROKE 2:
 * Arch + stem. Starts at the upper-left, arches over the top,
 * then runs straight down the right side with a small tail.
 */
export const letterLowerA: LetterDefinition = {
  id: "a",
  letter: "a",
  spokenName: "the letter A",

  acceptTranscripts: ["a", "ay", "letter a", "the letter a", "uh", "ah"],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — BOWL
     * Begins on the stem (x=156), goes left, loops under, and
     * rejoins the stem lower down.
     */
     [
      "M 153 200",
      "C 145 193 134 190 121 191",
      "C 101 193 87 206 87 224",
      "C 87 242 100 252 117 252",
      "C 133 252 145 245 153 232",
    ].join(" "),

    /**
     * STROKE 2 — ARCH + STEM
     * Small terminal at upper-left, arch over the top,
     * straight stem down, small tail at the baseline.
     */
    [
      "M 98 177",
      "C 106 165 120 159 134 159",
      "C 149 159 156 169 156 187",
      "L 156 238",
      "C 156 246 162 252 172 249",
    ].join(" "),
  ],

  strokeWidth: 21,
  previewScale: 0.7,

  traceTolerance: 28,
  traceCoverage: 0.99,

  directionArrowFractions: [0.12, 0.12],
};
