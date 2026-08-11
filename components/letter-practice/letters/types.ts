export type LetterId = "S";

export type LetterDefinition = {
  id: LetterId;
  /** Display glyph */
  letter: string;
  /** Friendly name spoken by TTS, e.g. "the letter S" */
  spokenName: string;
  /** Transcripts that count as a correct pronunciation */
  acceptTranscripts: string[];
  /** SVG viewBox */
  viewBox: string;
  /**
   * Single continuous stroke path for draw-in animation and tracing.
   * Prefer paths that follow how the letter is typically handwritten.
   */
  strokePath: string;
  /** Stroke width relative to the viewBox */
  strokeWidth: number;
  /** How close (in SVG units) a pointer must be to count as on-path */
  traceTolerance: number;
  /** Fraction of path samples that must be covered to succeed (0–1) */
  traceCoverage: number;
};

export type LetterStep = "speak" | "trace";
