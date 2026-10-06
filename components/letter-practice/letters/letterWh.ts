import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase "wh" digraph.
 *
 * STROKE 1 — w first valley
 * STROKE 2 — w second valley + exit (exit folded in so it can't block the h)
 * STROKE 3 — h stem
 * STROKE 4 — h hump
 */

export const letterWh: LetterDefinition = {
  id: "wh",

  letter: "wh",

  spokenName: "wh",

  acceptTranscripts: [
    "wh",
    "w h",
    "double u h",
    "double you h",
    "letter wh",
    "the letters wh",
    "wh sound",
    "what",
    "when",
    "where",
    "why",
    "which",
    "white",
    "whale",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — w first section
     */
    [
      "M 35 157.5",
      "C 33 178.3 30 205.9 30 222.1",
      "C 29 235.9 34 244 42 244",
      "C 51 244 59 234.8 66 219.8",
      "C 74 201.3 79 178.3 83 157.5",
    ].join(" "),

    /**
     * STROKE 2 — w second section + finishing exit
     */
    [
      "M 83 157.5",
      "C 81 179.4 78 205.9 78 222.1",
      "C 77 235.9 82 244 90 244",
      "C 99 244 107 234.8 114 219.8",
      "C 122 201.3 127 178.3 131 157.5",
      // Exit toward h (same geometry as before, not a separate gated stroke)
      "C 137 159 143 160 149 157.5",
    ].join(" "),

    /**
     * STROKE 3 — h stem
     */
    [
      "M 174 59",
      "C 170 88.7 166 121.2 162 153.7",
      "C 158 187.2 153 216.8 149 241",
    ].join(" "),

    /**
     * STROKE 4 — h hump
     */
    [
      "M 149 241",
      "C 153 224.5 158 204.4 162 181.6",
      "C 166 170.8 173 165.2 182 165.2",
      "C 195 165.2 203 173.4 204 184.8",
      "C 205 197.5 200 212 198 223.9",
      "C 196 235.4 198 241 204 241",
      "C 212 241 221 238.5 230 229",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = w first, 2 = w second+exit, 3 = h stem, 4 = h hump
  directionArrowFractions: [0.12, 0.12, 0.12, 0.42],
};
