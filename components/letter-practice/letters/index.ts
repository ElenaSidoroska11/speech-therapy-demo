import type { LetterDefinition } from "./types";
// import { letterCh } from "./letterCh";
import { letterA } from "./letterA";
import { letterL } from "./letterL";
import { letterM } from "./letterM";
import { letterS } from "./letterS";
// import { letterSh } from "./letterSh";
// import { letterTh } from "./letterTh";
// import { letterWh } from "./letterWh";

/**
 * Registry of practice graphemes (letters + digraphs).
 * To add one: create `letterX.ts`, extend `LetterId`, and register it here.
 *
 * Order drives the letter picker and “Next” navigation.
 * Currently active: cursive a, then S, M, L (wh and others commented out for later).
 */
export const LETTERS = {
  a: letterA,
  S: letterS,
  M: letterM,
  L: letterL,
  // ch: letterCh,
  // sh: letterSh,
  // th: letterTh,
  // wh: letterWh,
} as const satisfies Record<string, LetterDefinition>;

/** Only ids present in `LETTERS` (currently `a`, `S`, `M`, and `L`). */
export type ActiveLetterId = keyof typeof LETTERS;

export const AVAILABLE_LETTERS = Object.keys(LETTERS) as ActiveLetterId[];

export function getLetter(id: ActiveLetterId): LetterDefinition {
  return LETTERS[id];
}

export function getNextLetter(id: ActiveLetterId): ActiveLetterId | null {
  const i = AVAILABLE_LETTERS.indexOf(id);
  if (i < 0 || i >= AVAILABLE_LETTERS.length - 1) return null;
  return AVAILABLE_LETTERS[i + 1];
}

export type { LetterCueImage, LetterDefinition, LetterStep } from "./types";
/** App-facing id type matches what's currently registered. */
export type LetterId = ActiveLetterId;
