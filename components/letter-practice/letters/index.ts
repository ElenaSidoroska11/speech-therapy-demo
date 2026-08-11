import type { LetterDefinition, LetterId } from "./types";
import { letterS } from "./letterS";

/**
 * Registry of practice letters.
 * To add a letter: create `letterX.ts`, then register it here and extend `LetterId`.
 */
export const LETTERS: Record<LetterId, LetterDefinition> = {
  S: letterS,
};

export const AVAILABLE_LETTERS = Object.keys(LETTERS) as LetterId[];

export function getLetter(id: LetterId): LetterDefinition {
  return LETTERS[id];
}

export function getNextLetter(id: LetterId): LetterId | null {
  const i = AVAILABLE_LETTERS.indexOf(id);
  if (i < 0 || i >= AVAILABLE_LETTERS.length - 1) return null;
  return AVAILABLE_LETTERS[i + 1];
}

export type { LetterDefinition, LetterId, LetterStep } from "./types";
