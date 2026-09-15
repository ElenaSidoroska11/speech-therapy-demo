import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive lowercase a — two strokes.
 *
 * Stroke 1:
 * Starts at the upper-right, travels counterclockwise around
 * the oval, and finishes just before the top-right junction.
 *
 * Stroke 2:
 * Starts at the top-right junction and travels straight down
 * to the baseline, then curves into the exit tail.
 *
 * Scaled to span the shared ascender → baseline band (same height as h).
 */
export const letterA: LetterDefinition = {
  id: "a",
  letter: "a",
  spokenName: "the letter A",

  acceptTranscripts: ["a", "ay", "letter a", "the letter a", "uh", "ah"],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,
  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    "M 184.3 79.3 C 150.5 56.8 105.5 52 68.6 66.5 C 28.4 82.5 14 125.9 22 169.3 C 28.4 209.4 54.1 236.8 89.5 240 C 124.8 243.2 158.6 219.1 171.4 187 C 184.3 151.6 189.1 106.6 184.3 79.3",
    "M 184.3 79.3 C 182.7 117.9 179.4 156.4 176.2 191.8 C 173 219.1 173 235.1 184.3 241.6 C 197.1 248 213.2 238.4 226 223.9",
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,
  traceTolerance: 36,
  traceCoverage: 0.99,

  // 1 = oval, 2 = downstroke
  directionArrowFractions: [0.08, 0.05],
};
