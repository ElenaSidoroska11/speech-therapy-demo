import type { LetterDefinition } from "./types";
import { LOWERCASE_ARTBOARD, lowercaseRulingLines } from "./artboard";

/**
 * Cursive (Victoria Modern Script) lowercase s — one continuous stroke.
 * Start at the top right, hook counter-clockwise over the top, drop down
 * the left side, cross back through the centre, bulge right, then sweep
 * down to the baseline with a small leftward exit flick.
 *
 * Scaled to span the shared ascender → baseline band (same height as h).
 */
export const letterLowerS: LetterDefinition = {
  id: "s",
  letter: "s",
  spokenName: "the letter S",
  phonemeSound: "/sounds/s-phoneme.mp3",
  acceptTranscripts: [
    "s",
    "es",
    "ess",
    "letter s",
    "the letter s",
    "sss",
    "suh",
  ],
  viewBox: LOWERCASE_ARTBOARD.viewBox,
  fitAspectRatio: LOWERCASE_ARTBOARD.fitAspectRatio,
  rulingLines: lowercaseRulingLines(),
  strokePaths: [
    "M 164.8 74.4 C 148 52 78 52 66.8 82.8 C 55.6 110.8 78 136 117.2 147.2 C 153.6 157 184.4 172.4 164.8 206 C 150.8 231.2 108.8 248 61.2 234",
  ],
  strokeWidth: LOWERCASE_ARTBOARD.strokeWidth,
  traceTolerance: 16,
  traceCoverage: 0.99,
  directionArrowFractions: [0.06],
};
