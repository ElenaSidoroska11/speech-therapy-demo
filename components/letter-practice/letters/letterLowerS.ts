import type { LetterDefinition } from "./types";

/**
 * Cursive (Victoria Modern Script) lowercase s — one continuous stroke.
 * Start at the top right on the midline, hook counter-clockwise over the
 * top, drop down the left side, cross back through the centre, bulge
 * right, then sweep down to the baseline with a small leftward exit
 * flick. Coordinates fit a 120×168 artboard (viewBox "12 104 120 168").
 */
export const letterLowerS: LetterDefinition = {
  id: "s",
  letter: "s",
  spokenName: "the letter S",
  phonemeSound: "/sounds/s-phoneme.mp3",
  acceptTranscripts: [
    "s",
    "es",
    "ess",
    "letter s",
    "the letter s",
    "sss",
    "suh",
  ],
  // Include half the stroke (14) plus a little air so the top ruling line is visible.
  viewBox: "12 104 120 168",
  fitAspectRatio: 120 / 168,
  strokePaths: [
    "M 108 136 C 96 120 46 120 38 142 C 30 162 46 180 74 188 C 100 195 122 206 108 230 C 98 248 68 260 34 250",
  ],
  strokeWidth: 28,
  traceTolerance: 16,
  traceCoverage: 0.99,
  directionArrowFractions: [0.06],
};
