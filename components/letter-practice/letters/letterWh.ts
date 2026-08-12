import type { LetterDefinition } from "./types";

/**
 * Print digraph “wh” as two separate lowercase letters (not joined cursive).
 * Two stroke paths so w and h fill and complete independently.
 */
export const letterWh: LetterDefinition = {
  id: "wh",
  letter: "wh",
  spokenName: "the digraph w h",
  acceptTranscripts: [
    "wh",
    "w h",
    "double u h",
    "double you h",
    "what",
    "when",
    "where",
    "why",
    "which",
    "white",
    "whale",
  ],
  viewBox: "0 0 360 280",
  strokePaths: [
    // w — four-legged zigzag at x-height
    "M 24 112 L 62 232 L 100 112 L 138 232 L 176 112",
    // h — stem, then hump (two subpaths = one letter; both must be traced)
    [
      "M 230 48 L 230 232",
      "M 230 128 C 230 108 270 100 304 118 C 324 130 330 160 330 184 L 330 232",
    ].join(" "),
  ],
  strokeWidth: 26,
  traceTolerance: 30,
  // Each letter must reach this coverage on its own path
  traceCoverage: 0.99,
};
