import type { LetterDefinition } from "./types";

/**
 * Cursive (Victoria Modern Script) lowercase c — one continuous stroke.
 * Start on the upper right, curve counterclockwise over the top, down the
 * back, along the baseline, then up with an open exit to the right.
 * Coordinates fit a 200×280 artboard so the letter reads large on tablets.
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
  // Include half the stroke (14) plus a little air so round caps are not clipped.
  viewBox: "14 117 134 163",
  fitAspectRatio: 134 / 163,
  strokePaths: [
    "M 126 160 C 126 144 108 134 84 137 C 54 141 34 170 34 204 C 34 240 58 260 90 260 C 112 260 128 244 128 218",
  ],
  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,
  directionArrowFractions: [0.12],
};
