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
 * Same path design as before, scaled onto the shared artboard.
 * Path is inset by half the stroke so the visible ink stays
 * on/inside topline (line 1) and baseline (line 3).
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
      "M 135.1 156.3",

      // Across upper part of oval toward the left
      "C 120.0 149.2 101.8 150.0 88.3 158.7",

      // Left side curves downward
      "C 74.8 168.2 70.1 186.5 72.5 203.9",

      // Around bottom
      "C 74.8 222.1 85.1 232.4 98.6 232.4",

      // Right side comes back upward
      "C 114.5 232.4 127.1 218.9 131.9 202.3",

      // Finish exactly at the blue dot
      "C 135.8 187.2 137.4 169.8 135.1 156.3",
    ].join(" "),

    // ------------------------------------------------
    // STROKE 2
    // Blue dot → UP → TOP → retrace DOWN →
    // baseline → exit tail.
    // ------------------------------------------------
    [
      // Start exactly at blue dot
      "M 135.1 156.3",

      // Go UP the tall stem
      "C 139.0 131.8 143.0 104.0 147.7 75.5",

      // Reach top (inset so ink sits on line 1)
      "C 149.3 67.6 151.7 66.0 153.3 70.8",

      // Retrace DOWN almost directly over the same line
      "C 150.1 92.2 146.2 119.1 142.2 145.2",
      "C 139.0 168.2 135.8 193.6 133.5 215.8",

      // Reach baseline (inset so ink sits on line 3)
      "C 132.7 227.7 135.1 233.2 141.4 234.0",

      // Exit tail curves upward/right
      "C 149.3 234.8 158.8 227.7 169.9 217.4",
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
