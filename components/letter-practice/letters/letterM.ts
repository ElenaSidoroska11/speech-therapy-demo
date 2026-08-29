import type { LetterDefinition } from "./types";

/**
 * Handwriting-style capital M — four strokes (worksheet order):
 * 1) left stem up (start at bottom), 2) diagonal down to the valley,
 * 3) diagonal up, 4) right stem down. The middle is a valley (\/),
 * not a peak — that peak shape is W.
 */
export const letterM: LetterDefinition = {
  id: "M",
  letter: "M",
  spokenName: "the letter M",
  acceptTranscripts: [
    "m",
    "em",
    "mm",
    "mmm",
  ],
  viewBox: "0 0 200 280",
  strokePaths: [
    "M 48 248 L 48 28",
    "M 48 28 L 100 200",
    "M 100 200 L 152 28",
    "M 152 28 L 152 248",
  ],
  strokeWidth: 28,
  traceTolerance: 36,
  traceCoverage: 0.99,
  // 1 at bottom of left stem pointing up; 2–4 near each stroke start
  directionArrowFractions: [0.12, 0.12, 0.12, 0.12],
  cueImages: [
    { src: "/M-monkey.png", alt: "A monkey that looks like the letter M" },
  ],
};
