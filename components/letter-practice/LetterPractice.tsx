"use client";

import { useEffect } from "react";
import { playLetterPractice, playWatchHow } from "@/components/shared/sounds";
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

    let cancelCurrent: (() => void) | undefined;

    cancelCurrent = playLetterPractice(() => {
      cancelCurrent = playWatchHow();
    });

    return () => {
      cancelCurrent?.();
    };
  }, [mode]);

  const selectLetter = (id: LetterId) => {
    onLetterChange(id);
    onModeChange("exercise");
  };

  if (mode === "categories" || !letterStyle) {
    return (
      <LetterCategoryView style={letterStyle} onSelectLetter={selectLetter} />
    );
  }

  return (
    <TraceLetterExercise
      key={`${letterStyle}-${letterId}`}
      layout="landing"
      initialLetter={letterId}
      letterStyle={letterStyle}
      onNextLetter={onLetterChange}
    />
  );
}
