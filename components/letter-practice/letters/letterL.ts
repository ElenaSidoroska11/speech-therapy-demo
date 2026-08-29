import type { LetterDefinition } from "./types";

/**
 * Handwriting-style capital L — two strokes (worksheet order):
 * 1) stem down from the top, 2) base across to the right.
 */
export const letterL: LetterDefinition = {
  id: "L",
  letter: "L",
  spokenName: "the letter L",
  acceptTranscripts: [
    "l",
    "el",
    "ell",
    "ll",
  ],
  viewBox: "0 0 200 280",
  strokePaths: [
    "M 48 28 L 48 248",
    "M 48 248 L 168 248",
  ],
  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,
  // 1 on the stem (pointing down), 2 on the base (pointing right)
  directionArrowFractions: [0.18, 0.2],
  cueImages: [
    { src: "/L-lion.png", alt: "A lion that looks like the letter L" },
  ],
};
