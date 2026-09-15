/**
 * Practice graphemes: single letters and Victorian digraphs (ch, sh, th, wh).
 * Add new ids here when registering a definition in `./index.ts`.
 *
 * Note: not every id is active — see which entries are registered in `index.ts`.
 */
export type LetterId = "S" | "M" | "L" | "a" | "c" | "h" | "m" | "s" | "y" | "ch" | "sh" | "th" | "wh";

export type LetterCueImage = {
  src: string;
  alt: string;
};

export type LetterDefinition = {
  id: LetterId;
  /** Display glyph / grapheme */
  letter: string;
  /** Friendly name spoken by TTS, e.g. "the letter S" or "the digraph wh" */
  spokenName: string;
  /** Optional phoneme clip played when the stroke demo replays (path under public/) */
  phonemeSound?: string;
  /** Transcripts that count as a correct pronunciation */
  acceptTranscripts: string[];
  /** SVG viewBox */
  viewBox: string;
  /**
   * When set, the practice frame matches this width÷height so the letter
   * can scale to fill the card without changing stroke coordinates.
   */
  fitAspectRatio?: number;
  /**
   * Fixed handwriting-paper ruling lines (ascender + baseline).
   * When set, used instead of measuring the path bounding box so short
   * letters (a, c, s) share the same top/bottom guides as tall ones (h).
   */
  rulingLines?: { top: number; bottom: number };
  /**
   * One SVG path `d` per letter/shape to practice.
   * Single letters: one entry. Digraphs like “wh”: one path for “w”, one for “h”.
   * Trace progress and success are tracked independently per path.
   */
  strokePaths: string[];
  /** Stroke width relative to the viewBox */
  strokeWidth: number;
  /** How close (in SVG units) a pointer must be to count as on-path */
  traceTolerance: number;
  /** Fraction of samples that must be covered on *each* path to succeed (0–1) */
  traceCoverage: number;
  /**
   * Optional 0–1 positions along strokes for numbered tracing arrows
   * (worksheet-style). Start dot is always at the first path start.
   * One stroke: each value is an arrow on that path.
   * Several strokes: `fractions[i]` is the arrow on stroke i.
   */
  directionArrowFractions?: number[];
  /** Animal (or object) pictures that look like this letter */
  cueImages?: LetterCueImage[];
};

export type LetterStep = "speak" | "trace";
