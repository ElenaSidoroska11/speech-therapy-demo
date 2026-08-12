import type { LetterDefinition } from "./types";

/**
 * Joined digraph “ch” — continuous handwriting stroke (entry → c → h).
 */
export const letterCh: LetterDefinition = {
  id: "ch",
  letter: "ch",
  spokenName: "the digraph c h",
  acceptTranscripts: [
    "ch",
    "c h",
    "see h",
    "chair",
    "cheese",
    "chicken",
    "chip",
    "chips",
    "chop",
    "much",
    "watch",
  ],
  viewBox: "0 0 360 280",
  // Soft entry into c bowl → exit into h ascender → stem → bowl → exit
  strokePaths: [
    "M 118 100 C 92 100 58 118 58 168 C 58 218 92 240 128 236 C 148 234 162 220 172 200 L 172 48 C 172 40 174 36 182 36 C 190 36 192 40 192 48 L 192 168 C 192 168 208 128 242 128 C 270 128 300 148 300 188 C 300 218 280 236 254 236",
  ],
  strokeWidth: 26,
  traceTolerance: 34,
  traceCoverage: 0.92,
};
