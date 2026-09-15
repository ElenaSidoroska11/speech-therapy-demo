import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase c — one continuous stroke.
 * Start on the upper right, curve counterclockwise over the top, down the
 * back, along the baseline, then up with an open exit to the right.
 *
 * Scaled to span the shared ascender → baseline band (same height as h).
 */
export const letterC: LetterDefinition = {
  id: "c",
  letter: "c",
  spokenName: "the letter C",
  acceptTranscripts: [
    "c",
    "cee",
    "see",
    "letter c",
    "the letter c",
    "kuh",
  ],
  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,
  rulingLines: lowercaseRulingLines(),
  strokePaths: [
    "M 190 92.4 C 190 67.6 162 52 124.7 56.7 C 78 62.9 46.9 108 46.9 160.9 C 46.9 216.9 84.2 248 134 248 C 168.2 248 193.1 223.1 193.1 182.7",
  ],
  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,
  traceTolerance: 36,
  traceCoverage: 0.99,
  directionArrowFractions: [0.12],
};
