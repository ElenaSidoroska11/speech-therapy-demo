"use client";

import { useEffect } from "react";
import { playIntroThenPhoneme } from "@/components/shared/sounds";
import { TraceLetterExercise } from "./TraceLetterExercise";
import { getLetter, type LetterId } from "./letters";

/** Letter Practice  */
export function LetterPractice({
  letterId,
  onLetterChange,
}: {
  letterId: LetterId;
  onLetterChange: (id: LetterId) => void;
}) {
  useEffect(() => {
    const letter = getLetter(letterId);
    let cancelIntro: (() => void) | undefined;

    const delayId = window.setTimeout(() => {
      cancelIntro = playIntroThenPhoneme(letter.phonemeSound);
    }, 3000);

    return () => {
      window.clearTimeout(delayId);
      cancelIntro?.();
    };
  }, []);

  return (
    <TraceLetterExercise
      key={letterId}
      layout="landing"
      initialLetter={letterId}
      onNextLetter={onLetterChange}
    />
  );
}
