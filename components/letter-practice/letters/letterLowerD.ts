import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive lowercase d — two strokes.
 *
 * Stroke 1:
 * Draw only the oval, counterclockwise, ending at the blue dot.
 *
 * Stroke 2:
 * Start at the blue dot → go UP to the top →
 * retrace DOWN the same stem → baseline → exit tail.
 *
 * Midway between a fully inset path and a path-centerline
 * flush on topline (line 1) / baseline (line 3).
 */
export const letterLowerD: LetterDefinition = {
  id: "d",
  letter: "d",
  spokenName: "the letter D",

  acceptTranscripts: [
    "d",
    "dee",
    "letter d",
    "the letter d",
    "duh",
  ],

  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,

  rulingLines: lowercaseRulingLines(),

  strokePaths: [
    // ------------------------------------------------
    // STROKE 1
    // Blue dot → left around oval → bottom → back to dot.
    // It does NOT enter the tall stem.
    // ------------------------------------------------
    [
      "M 135.1 156.6",

      // Across upper part of oval toward the left
      "C 120.0 148.9 101.8 149.8 88.3 159.2",

      // Left side curves downward
      "C 74.8 169.4 70.1 189.2 72.5 208.0",

      // Around bottom
      "C 74.8 227.7 85.1 238.8 98.6 238.8",

      // Right side comes back upward
      "C 114.5 238.8 127.1 224.2 131.9 206.3",

      // Finish exactly at the blue dot
      "C 135.8 190.0 137.4 171.2 135.1 156.6",
    ].join(" "),

    // ------------------------------------------------
    // STROKE 2
    // Blue dot → UP → TOP → retrace DOWN →
    // baseline → exit tail.
    // ------------------------------------------------
    [
      // Start exactly at blue dot
      "M 135.1 156.6",

      // Go UP the tall stem
      "C 139.0 130.1 143.0 100.1 147.7 69.3",

      // Reach top (near line 1)
      "C 149.3 60.7 151.7 59.0 153.3 64.2",

      // Retrace DOWN almost directly over the same line
      "C 150.1 87.3 146.2 116.4 142.2 144.6",
      "C 139.0 169.4 135.8 196.9 133.5 220.9",

      // Reach baseline (near line 3)
      "C 132.7 233.7 135.1 239.7 141.4 240.5",

      // Exit tail curves upward/right
      "C 149.3 241.4 158.8 233.7 169.9 222.6",
    ].join(" "),
  ],

  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,
  traceTolerance: 36,
  traceCoverage: 0.99,

  directionArrowFractions: [
    0.08, // stroke 1
    0.52, // stroke 2 — arrow on downward movement
  ],
};
