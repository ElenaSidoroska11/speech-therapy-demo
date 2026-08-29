"use client";

import { useState } from "react";
import { TraceLetterExercise } from "./TraceLetterExercise";
import type { LetterId } from "./letters";

/** Letter Practice  */
export function LetterPractice() {
  const [letterId, setLetterId] = useState<LetterId>("a");

  return (
    <TraceLetterExercise
      key={letterId}
      layout="landing"
      initialLetter={letterId}
      onNextLetter={(id) => setLetterId(id)}
    />
  );
}
