"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CelebrationBurst } from "@/components/shared/CelebrationBurst";
import { playSoftError } from "@/components/shared/sounds";
import { TraceExerciseHeader } from "./TraceExerciseHeader";
import { TraceExerciseWorkspace } from "./TraceExerciseWorkspace";
import { useLetterDemo } from "./hooks/useLetterDemo";
import {
  ERROR_PULSE_TOTAL_MS,
  useLetterTrace,
} from "./hooks/useLetterTrace";
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
  initialLetter = "a",
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
  const errorPulseClearTimerRef = useRef<number | null>(null);
  const { demoProgress, handleDemoMeasured, replayDemo } = useLetterDemo(
    letterId,
    letter.phonemeSound,
  );

  const handleComplete = useCallback(() => {
    setCelebrate(true);
  }, []);

  const clearErrorPulse = useCallback(() => {
    if (errorPulseClearTimerRef.current != null) {
      window.clearTimeout(errorPulseClearTimerRef.current);
      errorPulseClearTimerRef.current = null;
    }
    setErrorPulse(0);
  }, []);

  const handleOffPath = useCallback(() => {
    playSoftError();
    setErrorPulse((n) => n + 1);
    if (errorPulseClearTimerRef.current != null) {
      window.clearTimeout(errorPulseClearTimerRef.current);
    }
    // Stop treating the stroke as "in error" once jumps finish, so a new
    // draw does not replay the jump animation.
    errorPulseClearTimerRef.current = window.setTimeout(() => {
      errorPulseClearTimerRef.current = null;
      setErrorPulse(0);
    }, ERROR_PULSE_TOTAL_MS);
  }, []);

  const handleStrokeStart = useCallback(() => {
    clearErrorPulse();
  }, [clearErrorPulse]);

  useEffect(() => {
    return () => {
      if (errorPulseClearTimerRef.current != null) {
        window.clearTimeout(errorPulseClearTimerRef.current);
      }
    };
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
    onStrokeStart: handleStrokeStart,
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

  const header = <TraceExerciseHeader letter={letter} />;

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
        <div
          className={`${CENTER_TITLE_SLOT} relative flex flex-col items-center gap-3 md:justify-center`}>
          <div className="hidden md:block">
            <HomeTitleHeightSpacer />
          </div>
          <div className="relative z-20 flex w-full flex-col items-center gap-3 px-1 md:absolute md:inset-x-4 md:top-1/2 md:-translate-y-1/2 md:gap-4 md:px-0 lg:inset-x-6">
            {header}
          </div>
        </div>

        <div className={CENTER_BODY_SLOT}>
          <div className={`${CENTER_CONTENT_WIDTH} max-w-lg sm:max-w-2xl md:max-w-none`}>
            <div className="relative flex min-h-0 flex-1 flex-col p-1 sm:p-3 md:p-4">
              {celebrate && <CelebrationBurst />}
              <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col md:aspect-16/10 md:flex-none">
                <div className="flex min-h-0 flex-1 flex-col gap-3 md:absolute md:inset-0">
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
        {workspace}
      </div>
    </section>
  );
}
