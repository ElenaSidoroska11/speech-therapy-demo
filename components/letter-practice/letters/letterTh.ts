import type { LetterDefinition } from "./types";

/**
 * Joined digraph “th” — one continuous stroke (crossbar → stem → h).
 */
export const letterTh: LetterDefinition = {
  id: "th",
  letter: "th",
  spokenName: "the digraph t h",
  acceptTranscripts: [
    "th",
    "t h",
    "the",
    "this",
    "that",
    "then",
    "they",
    "there",
    "three",
    "with",
    "thank",
    "thumb",
  ],
  viewBox: "0 0 360 280",
  // Crossbar into stem, down into connector, h ascender → stem → bowl → exit
  strokePaths: [
    "M 58 96 L 158 96 C 150 96 142 96 136 96 L 136 188 C 136 210 150 228 172 228 C 184 228 192 220 198 208 L 198 48 C 198 40 200 36 208 36 C 216 36 218 40 218 48 L 218 168 C 218 168 234 128 268 128 C 296 128 324 148 324 188 C 324 218 304 236 278 236",
  ],
  strokeWidth: 26,
  traceTolerance: 34,
  traceCoverage: 0.92,
};
