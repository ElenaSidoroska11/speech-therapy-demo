import type { LetterDefinition } from "./types";
import { letterCh } from "./letterCh";
import { letterA } from "./letterA";
import { letterLowerB } from "./letterLowerB";
import { letterC } from "./letterC";
import { letterLowerD } from "./letterLowerD";

import { letterLowerE } from "./letterLowerE";
import { letterLowerF } from "./letterLowerF";
import { letterLowerG } from "./letterLowerG";
// import { letterL } from "./letterL";
import { letterLowerH } from "./letterLowerH";
import { letterLowerI } from "./letterLowerI";
import { letterLowerJ } from "./letterLowerJ";
import { letterLowerK } from "./letterLowerK";
import { letterLowerL } from "./letterLowerL";
import { letterLowerM } from "./letterLowerM";
import { letterLowerN } from "./letterLowerN";
import { letterLowerO } from "./letterLowerO";
import { letterLowerP } from "./letterLowerP";
import { letterLowerQ } from "./letterLowerQ";
import { letterLowerR } from "./letterLowerR";
import { letterLowerS } from "./letterLowerS";
import { letterLowerT } from "./letterLowerT";
import { letterLowerU } from "./letterLowerU";
import { letterLowerV } from "./letterLowerV";
import { letterLowerW } from "./letterLowerW";
import { letterLowerX } from "./letterLowerX";
import { letterLowerY } from "./letterLowerY";
import { letterLowerZ } from "./letterLowerZ";
// import { letterM } from "./letterM";
// import { letterS } from "./letterS";
import { letterSh } from "./letterSh";
import { letterTh } from "./letterTh";
import { letterWh } from "./letterWh";

/**
 * Registry of practice graphemes (letters + digraphs).
 * To add one: create `letterX.ts`, extend `LetterId`, and register it here.
 *
 * Order drives the letter picker and “Next” navigation.
 * Every registered letter is selectable.
 */
export const LETTERS = {
  a: letterA,
  b: letterLowerB,
  c: letterC,
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
  n: letterLowerN,
  o: letterLowerO,
  p: letterLowerP,
  q: letterLowerQ,
  r: letterLowerR,
  s: letterLowerS,
  t: letterLowerT,
  u: letterLowerU,
  v: letterLowerV,
  w: letterLowerW,
  x: letterLowerX,
  y: letterLowerY,
  z: letterLowerZ,
  // S: letterS,
  // M: letterM,
  // L: letterL,
  ch: letterCh,
  sh: letterSh,
  th: letterTh,
  wh: letterWh,
} as const satisfies Record<string, LetterDefinition>;

/** Only ids present in `LETTERS`. */
export type ActiveLetterId = keyof typeof LETTERS;

export const AVAILABLE_LETTERS = Object.keys(LETTERS) as ActiveLetterId[];

export function isSelectableLetter(id: ActiveLetterId): boolean {
  return id in LETTERS;
}

export function getLetter(id: ActiveLetterId): LetterDefinition {
  return LETTERS[id];
}

export function getNextLetter(id: ActiveLetterId): ActiveLetterId | null {
  const i = AVAILABLE_LETTERS.indexOf(id);
  if (i < 0) return null;
  for (let nextIndex = i + 1; nextIndex < AVAILABLE_LETTERS.length; nextIndex++) {
    const next = AVAILABLE_LETTERS[nextIndex];
    if (isSelectableLetter(next)) return next;
  }
  return null;
}

export type { LetterCueImage, LetterDefinition, LetterStep } from "./types";
/** App-facing id type matches what's currently registered. */
export type LetterId = ActiveLetterId;
