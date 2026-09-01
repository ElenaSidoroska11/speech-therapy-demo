"use client";

import { TraceLetterExercise } from "./TraceLetterExercise";
import type { LetterId } from "./letters";

/** Letter Practice  */
export function LetterPractice({
  letterId,
  onLetterChange,
}: {
  letterId: LetterId;
  onLetterChange: (id: LetterId) => void;
}) {
  return (
    <TraceLetterExercise
      key={letterId}
      layout="landing"
      initialLetter={letterId}
      onNextLetter={onLetterChange}
    />
  );
}
