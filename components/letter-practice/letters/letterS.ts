import type { LetterDefinition } from "./types";

/**
 * Handwriting-style capital S — one continuous stroke from top to bottom.
 * Coordinates fit a 200×280 artboard so the letter reads large on tablets.
 */
export const letterS: LetterDefinition = {
  id: "S",
  letter: "S",
  spokenName: "the letter S",
  acceptTranscripts: [
    "s",
    "es",
    "ess",
    "letter s",
    "the letter s",
    "sss",
    "ss",
    "s s",
    "es es",
    "ess ess",
  ],
  viewBox: "0 0 200 280",
  strokePaths: [
    "M 148 62 C 148 38 128 28 100 28 C 72 28 48 44 48 70 C 48 92 62 104 88 116 L 112 128 C 138 140 152 156 152 182 C 152 212 130 248 100 248 C 70 248 48 228 48 204",
  ],
  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,
  // Start at top-right, then a second arrow on the lower-right curve
  directionArrowFractions: [0.08, 0.66],
  cueImages: [{ src: "/S-snake.png", alt: "A snake that looks like the letter S" }],
};
