import type { LetterDefinition } from "./types";

/**
 * Joined digraph “sh” — continuous handwriting stroke (entry → s → h).
 */
export const letterSh: LetterDefinition = {
  id: "sh",
  letter: "sh",
  spokenName: "the digraph s h",
  acceptTranscripts: [
    "sh",
    "s h",
    "shh",
    "shhh",
    "ship",
    "shop",
    "shell",
    "fish",
    "sheep",
    "shoe",
    "wash",
  ],
  viewBox: "0 0 360 280",
  // Compact s curves → connector into h ascender → stem → bowl → exit
  strokePaths: [
    "M 128 88 C 128 68 112 58 92 58 C 70 58 52 72 52 92 C 52 110 64 120 86 128 L 108 136 C 130 144 142 158 142 178 C 142 204 122 228 92 228 C 74 228 60 216 54 200 L 168 48 C 168 40 170 36 178 36 C 186 36 188 40 188 48 L 188 168 C 188 168 204 128 238 128 C 266 128 296 148 296 188 C 296 218 276 236 250 236",
  ],
  strokeWidth: 26,
  traceTolerance: 34,
  traceCoverage: 0.92,
};
