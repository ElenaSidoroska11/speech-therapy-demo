"use client";

import { useEffect } from "react";
import { playLetterPractice } from "@/components/shared/sounds";
import { LetterCategoryView } from "./LetterCategoryView";
import { TraceLetterExercise } from "./TraceLetterExercise";
import type { LetterStyle } from "./letterStyles";
import type { LetterId } from "./letters";

type LetterPracticeMode = "categories" | "exercise";

/** Letter Practice  */
export function LetterPractice({
  letterId,
  letterStyle,
  mode,
  onLetterChange,
  onModeChange,
}: {
  letterId: LetterId;
  letterStyle: LetterStyle | null;
  mode: LetterPracticeMode;
  onLetterChange: (id: LetterId) => void;
  onModeChange: (mode: LetterPracticeMode) => void;
}) {
  useEffect(() => {
    if (mode !== "categories") return;

    let cancelLetterPractice: (() => void) | undefined;

    const delayId = window.setTimeout(() => {
      cancelLetterPractice = playLetterPractice();
    }, 3000);

    return () => {
      window.clearTimeout(delayId);
      cancelLetterPractice?.();
    };
  }, [mode]);

  const selectLetter = (id: LetterId) => {
    onLetterChange(id);
    onModeChange("exercise");
  };

  if (mode === "categories") {
    return (
      <LetterCategoryView style={letterStyle} onSelectLetter={selectLetter} />
    );
  }

  return (
    <TraceLetterExercise
      key={letterId}
      layout="landing"
      initialLetter={letterId}
      onNextLetter={onLetterChange}
    />
  );
}
