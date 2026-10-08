import type { LetterId } from "../letters";
import type { LetterDefinition } from "../letters/types";
import { letterLowerA } from "./letterLowerA";
import { letterLowerB } from "./letterLowerB";
import { letterLowerC } from "./letterLowerC";
import { letterLowerD } from "./letterLowerD";
import { letterLowerE } from "./letterLowerE";
import { letterLowerF } from "./letterLowerF";
import { letterLowerG } from "./letterLowerG";
import { letterLowerH } from "./letterLowerH";
import { letterLowerI } from "./letterLowerI";
import { letterLowerJ } from "./letterLowerJ";
import { letterLowerK } from "./letterLowerK";
import { letterLowerL } from "./letterLowerL";
import { letterLowerM } from "./letterLowerM";
/**
 * Registry of unjoined print practice letters.
 * To add one: create `letterLowerX.ts` and register it here.
 *
 * Order drives the letter picker and “Next” navigation.
 */
export const PRINT_LETTERS = {
  a: letterLowerA,
  b: letterLowerB,
  c: letterLowerC,
  d: letterLowerD,
  e: letterLowerE,
  f: letterLowerF,
  g: letterLowerG,
  h: letterLowerH,
  i: letterLowerI,
  j: letterLowerJ,
  k: letterLowerK,
  l: letterLowerL,
  m: letterLowerM,
} as const satisfies Partial<Record<LetterId, LetterDefinition>>;

/** Only ids present in `PRINT_LETTERS`. */
export type PrintLetterId = keyof typeof PRINT_LETTERS;

export const AVAILABLE_PRINT_LETTERS = Object.keys(PRINT_LETTERS) as PrintLetterId[];

export function isSelectablePrintLetter(id: LetterId): id is PrintLetterId {
  return id in PRINT_LETTERS;
}

export function getPrintLetter(id: LetterId): LetterDefinition {
  if (!isSelectablePrintLetter(id)) {
    throw new Error(`Unknown print letter: ${id}`);
  }
  return PRINT_LETTERS[id];
}

export function getNextPrintLetter(id: LetterId): PrintLetterId | null {
  if (!isSelectablePrintLetter(id)) return null;
  const i = AVAILABLE_PRINT_LETTERS.indexOf(id);
  if (i < 0) return null;
  return AVAILABLE_PRINT_LETTERS[i + 1] ?? null;
}
