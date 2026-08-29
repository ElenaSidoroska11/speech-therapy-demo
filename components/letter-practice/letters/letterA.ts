import type { LetterDefinition } from "./types";

/**
 * Cursive (script) lowercase a — one continuous stroke.
 * Start on the right of the oval, go counterclockwise, close the oval
 * up the stem, then down with a small exit curve to the right.
 * Coordinates fit a 200×280 artboard so the letter reads large on tablets.
 */
export const letterA: LetterDefinition = {
  id: "a",
  letter: "a",
  spokenName: "the letter A",
  acceptTranscripts: [
    "a",
    "ay",
    "letter a",
    "the letter a",
    "uh",
    "ah",
  ],
  viewBox: "0 0 200 280",
  strokePaths: [
    "M 158 88 C 146 46 92 32 56 62 C 22 90 20 168 52 216 C 76 250 124 254 158 220 L 158 48 L 158 248 C 158 264 178 268 194 250",
  ],
  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,
  // Start on the oval, then a second arrow on the downstroke
  directionArrowFractions: [0.08, 0.78],
};
