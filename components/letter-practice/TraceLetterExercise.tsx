"use client";

import { useCallback, useRef, useState } from "react";
import { CelebrationBurst } from "@/components/shared/CelebrationBurst";
import { playSoftError } from "@/components/shared/sounds";
import { LetterPicker } from "./LetterPicker";
import { TraceExerciseHeader } from "./TraceExerciseHeader";
import { TraceExerciseWorkspace } from "./TraceExerciseWorkspace";
import { useLetterDemo } from "./hooks/useLetterDemo";
import { useLetterTrace } from "./hooks/useLetterTrace";
import { getLetter, getNextLetter, type LetterId } from "./letters";
import {
  CENTER_BODY_SLOT,
  CENTER_CONTENT_WIDTH,
  CENTER_TITLE_SLOT,
  HomeTitleHeightSpacer,
} from "@/components/HomeLanding";

type TraceLetterExerciseProps = {
  initialLetter?: LetterId;
  onNextLetter?: (letterId: LetterId) => void;
  layout?: "stacked" | "landing";
};

export function TraceLetterExercise({
  initialLetter = "s",
  onNextLetter,
  layout = "stacked",
}: TraceLetterExerciseProps) {
  const [letterId, setLetterId] = useState<LetterId>(initialLetter);
  const [session, setSession] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [errorPulse, setErrorPulse] = useState(0);
  const letter = getLetter(letterId);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const { demoProgress, handleDemoMeasured, replayDemo } = useLetterDemo(
    letterId,
    letter.phonemeSound,
  );

  const handleComplete = useCallback(() => {
    setCelebrate(true);
  }, []);

  const handleOffPath = useCallback(() => {
    playSoftError();
    setErrorPulse((n) => n + 1);
  }, []);

  const {
    progress,
    complete,
    strokePathD,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    reset,
  } = useLetterTrace({
    pathRefs,
    svgRef,
    pathCount: letter.strokePaths.length,
    tolerance: letter.traceTolerance,
    coverageThreshold: letter.traceCoverage,
    pathKey: `${letter.strokePaths.join("|")}-${session}`,
    enabled: true,
    onComplete: handleComplete,
    onOffPath: handleOffPath,
  });

  const clearTrace = () => {
    setCelebrate(false);
    reset();
    setSession((n) => n + 1);
  };

  const selectLetter = (id: LetterId) => {
    setCelebrate(false);
    setLetterId(id);
    setSession((n) => n + 1);
  };

  const nextLetter = getNextLetter(letterId);
  const wideLetter = letter.letter.length > 1;

  const header = (
    <TraceExerciseHeader
      letter={letter}
      letterId={letterId}
      onSelectLetter={selectLetter}
    />
  );

  const workspace = (
    <TraceExerciseWorkspace
      letter={letter}
      wideLetter={wideLetter}
      complete={complete}
      progress={progress}
      nextLetter={nextLetter}
      demoProgress={demoProgress}
      errorPulse={errorPulse}
      svgRef={svgRef}
      pathRefs={pathRefs}
      onDemoMeasured={handleDemoMeasured}
      onReplayDemo={replayDemo}
      onClear={clearTrace}
      onNext={(id) => {
        selectLetter(id);
        onNextLetter?.(id);
      }}
      trace={{
        strokePathD,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
      }}
    />
  );

  if (layout === "landing") {
    return (
      <>
        <div className={`${CENTER_TITLE_SLOT} relative flex flex-col items-center justify-center`}>
          <HomeTitleHeightSpacer />
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 sm:inset-x-6 sm:gap-4">
            {header}
          </div>
        </div>

        <div className={CENTER_BODY_SLOT}>
          <div className={CENTER_CONTENT_WIDTH}>
            <div className="relative p-2 sm:p-3 md:p-4">
              {celebrate && <CelebrationBurst />}
              <div className="relative z-10 aspect-16/10 w-full min-h-48 sm:min-h-0">
                <div className="absolute inset-0 flex min-h-0 flex-col gap-2 sm:gap-3">
                  {workspace}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="relative flex min-h-0 w-full flex-1 flex-col items-center gap-3 overflow-hidden sm:gap-4">
      {celebrate && <CelebrationBurst />}
      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center gap-3 sm:gap-4">
        {header}
        <LetterPicker letterId={letterId} onSelect={selectLetter} />
        {workspace}
      </div>
    </section>
  );
}
