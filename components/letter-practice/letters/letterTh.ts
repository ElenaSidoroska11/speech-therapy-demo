import type { LetterDefinition } from "./types";

import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Victoria Modern Script lowercase "th" digraph.
 *
 * The t and h are the SAME HEIGHT:
 * both main stems start at the ascender line.
 *
 * STROKE 1 — t main stroke
 * STROKE 2 — t crossbar
 * STROKE 3 — h stem
 * STROKE 4 — h hump
 *
 * Trace scoring allows any incomplete stroke within tolerance (see
 * useLetterTrace), so crossing the t before or after the h both work.
 */

export const letterTh: LetterDefinition = {
  id: "th",

  letter: "th",

  spokenName: "th",

  acceptTranscripts: [
    "th",
    "t h",
    "letter th",
    "the letters th",
    "th sound",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,

  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    /**
     * STROKE 1 — t main stroke
     *
     * Raised so the t starts at the same height as the h.
     * Starts at y=59, exactly like the h stem.
     */
    [
      "M 82 59",
      "C 80 86 78 113 76 140",
      "C 74 168 71 194 68 215",
      "C 66 226 64 234 65 239",
      "C 66 247 74 251 84 248",
      "C 94 245 103 236 112 227",
    ].join(" "),

    /**
     * STROKE 2 — t crossbar
     */
    [
      "M 55 150",
      "C 72 150 91 150 110 150",
    ].join(" "),

    /**
     * STROKE 3 — h stem
     */
    [
      "M 151 59",
      "C 146 88.7 140 121.2 134 153.7",
      "C 128 187.2 121 216.8 115 241",
    ].join(" "),

    /**
     * STROKE 4 — h hump
     */
    [
      "M 115 241",
      "C 121 224.5 128 204.4 134 181.6",
      "C 140 170.8 150 165.2 162 165.2",
      "C 179 165.2 190 173.4 191 184.8",
      "C 192 197.5 185 212 182 223.9",
      "C 179 235.4 181 241 189 241",
      "C 199 241 212 238.5 225 229",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,

  traceTolerance: 36,

  traceCoverage: 0.99,

  // 1 = t main, 2 = crossbar, 3 = h stem, 4 = h hump
  directionArrowFractions: [0.15, 0.5, 0.12, 0.42],
};