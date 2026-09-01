"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CelebrationBurst } from "@/components/shared/CelebrationBurst";
import { playCelebration, playSuccessChime } from "@/components/shared/sounds";
import { LetterPicker } from "./LetterPicker";
import { TraceExerciseHeader } from "./TraceExerciseHeader";
import { TraceExerciseWorkspace } from "./TraceExerciseWorkspace";
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
  initialLetter = "h",
  onNextLetter,
  layout = "stacked",
}: TraceLetterExerciseProps) {
  const [letterId, setLetterId] = useState<LetterId>(initialLetter);
  const [session, setSession] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const letter = getLetter(letterId);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const demoReadyRef = useRef(false);
  const replayTimeoutRef = useRef<number>(0);

  const handleComplete = useCallback(() => {
    setCelebrate(true);
    playSuccessChime();
    window.setTimeout(() => playCelebration(), 280);
  }, []);

  useEffect(() => {
    demoReadyRef.current = false;
    setDemoProgress(0);
    window.clearTimeout(replayTimeoutRef.current);
  }, [letterId]);

  const handleDemoMeasured = useCallback(() => {
    demoReadyRef.current = true;
    setDemoProgress(1);
  }, []);

  const replayDemo = () => {
    if (!demoReadyRef.current) return;
    window.clearTimeout(replayTimeoutRef.current);
    setDemoProgress(0);
    replayTimeoutRef.current = window.setTimeout(() => {
      setDemoProgress(1);
    }, 50);
  };

  useEffect(() => {
    return () => window.clearTimeout(replayTimeoutRef.current);
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
          {celebrate && <CelebrationBurst />}
          <div className={CENTER_CONTENT_WIDTH}>
            <div className="relative p-2 sm:p-3 md:p-4">
              <div className="relative aspect-16/10 w-full min-h-48 sm:min-h-0">
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
      {header}
      <LetterPicker letterId={letterId} onSelect={selectLetter} />
      {workspace}
    </section>
  );
}
