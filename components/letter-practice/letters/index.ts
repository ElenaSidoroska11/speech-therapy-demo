import type { LetterDefinition } from "./types";
// import { letterCh } from "./letterCh";
// import { letterS } from "./letterS";
// import { letterSh } from "./letterSh";
// import { letterTh } from "./letterTh";
import { letterWh } from "./letterWh";

/**
 * Registry of practice graphemes (letters + digraphs).
 * To add one: create `letterX.ts`, extend `LetterId`, and register it here.
 *
 * Order drives the letter picker and “Next” navigation.
 * Currently active: wh only (others commented out for later).
 */
export const LETTERS = {
  // S: letterS,
  // ch: letterCh,
  // sh: letterSh,
  // th: letterTh,
  wh: letterWh,
} as const satisfies Record<string, LetterDefinition>;

/** Only ids present in `LETTERS` (currently just `wh`). */
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

export type { LetterDefinition, LetterStep } from "./types";
/** App-facing id type matches what's currently registered. */
export type LetterId = ActiveLetterId;
