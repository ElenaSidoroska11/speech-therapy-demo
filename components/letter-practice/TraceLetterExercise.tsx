"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CelebrationBurst } from "@/components/shared/CelebrationBurst";
import { playCelebration, playSuccessChime } from "@/components/shared/sounds";
// import { FeedbackBanner } from "./FeedbackBanner";
import { LetterStroke } from "./LetterStroke";
import { useLetterTrace } from "./hooks/useLetterTrace";
import { AVAILABLE_LETTERS, getLetter, getNextLetter, type LetterId } from "./letters";
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
    // offPath,
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

  // const feedback = complete
  //   ? "Great job!"
  //   : offPath
  //     ? "Stay on the path — you’ve got this!"
  //     : letter.strokePaths.length > 1
  //       ? `Trace “${letter.letter}” along each path, start to finish`
  //       : "Trace along the letter path";
  // const feedbackTone = complete ? "success" : "hint";

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
  const percent = Math.round(progress * 100);
  const wideLetter = letter.letter.length > 1;

  const header = (
    <>
      <header className="shrink-0 text-center">
        <p className="font-(family-name:--font-display) text-sm font-semibold uppercase tracking-wide text-teal-800/70">
          Trace the letter
        </p>
        <h1 className="mt-0.5 font-(family-name:--font-display) text-3xl font-bold text-[#e52328] sm:text-4xl">
          Write '{letter.letter}'
        </h1>
        <p className="mt-1 max-w-lg text-sm font-semibold text-teal-900/70 sm:text-base">
          Watch how the letter is written, then trace it with your finger, stylus or mouse.
        </p>
      </header>

      {AVAILABLE_LETTERS.length > 1 && (
        <div className="flex shrink-0 flex-wrap justify-center gap-2">
          {AVAILABLE_LETTERS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => selectLetter(id)}
              className={`rounded-xl px-3 py-1.5 text-sm font-extrabold ring-2 transition ${
                id === letterId
                  ? "bg-[#FDA702] text-white ring-white/70"
                  : "bg-white/70 text-[#FDA702] ring-white/50 hover:bg-white"
              }`}>
              {getLetter(id).letter}
            </button>
          ))}
        </div>
      )}
    </>
  );

  const actions = (
    <div className="flex min-h-0 shrink-0 flex-wrap items-center justify-center gap-3">
      {!complete && progress > 0 && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={clearTrace}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-extrabold text-white ring-2 ring-white/70">
          <RotateCcw className="h-7 w-7 text-white" strokeWidth={3} />
          <span className="text-xl leading-none">Clear</span>
        </motion.button>
      )}

      {complete && nextLetter && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            selectLetter(nextLetter);
            onNextLetter?.(nextLetter);
          }}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FDA702] px-5 py-3 font-extrabold text-white  ring-2 ring-white/70">
          <span className="text-xl leading-none"> Next: {getLetter(nextLetter).letter}</span>
          <ArrowRight className="h-7 w-7 text-white" strokeWidth={3} />
        </motion.button>
      )}

      {complete && !nextLetter && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={clearTrace}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#FDA702] px-5 py-3 font-extrabold text-white  ring-2 ring-white/70">
          <span className="text-xl leading-none">Repeat</span>
          <RotateCcw className="h-7 w-7 text-white" strokeWidth={3} />
        </motion.button>
      )}
    </div>
  );

  const workspace = (
    <>
      <div className="grid min-h-0 w-full flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-4 sm:grid-cols-2 sm:grid-rows-[minmax(0,1fr)] sm:gap-5">
        <div className="flex min-h-0 flex-col items-center gap-2">
          <div className="flex shrink-0 items-center justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={replayDemo}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#e52328] px-4 py-3 font-extrabold text-white  ring-2 ring-white/70">
              <RotateCcw className="h-7 w-7 text-white" strokeWidth={3} />
              <span className="text-xl leading-none">Play</span>
            </motion.button>
          </div>
          <div
            className={`relative min-h-0 w-full flex-1 ${
              letter.cueImages?.length
                ? "max-w-lg sm:max-w-xl"
                : wideLetter
                  ? "max-w-xl"
                  : "max-w-md sm:max-w-lg"
            }`}>
            <div className="absolute inset-0 rounded-4xl bg-white/55 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm" />
            <div
              className={`absolute top-[2%] bottom-[6%] left-1/2 -translate-x-1/2 ${
                letter.cueImages?.length ? "w-[90%]" : wideLetter ? "w-[90%]" : "w-[78%]"
              }`}>
              <LetterStroke
                letter={letter}
                progress={demoProgress}
                showGuide
                showCueImages
                onMeasured={handleDemoMeasured}
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col items-center gap-2">
          <div className="flex min-h-13 shrink-0 items-center justify-center">
            {actions}
          </div>
          <div
            className={`relative min-h-0 w-full flex-1 ${
              wideLetter ? "max-w-xl" : "max-w-md sm:max-w-lg"
            }`}>
            <div className="absolute inset-0 rounded-4xl bg-white/55 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm" />
            <div
              className={`absolute top-[2%] bottom-[6%] left-1/2 -translate-x-1/2 ${
                wideLetter ? "w-[90%]" : "w-[78%]"
              }`}>
              <LetterStroke
                letter={letter}
                progress={complete ? 1 : 0}
                showGuide
                showDirectionGuides
                svgRef={svgRef}
                pathRefs={pathRefs}
                interactive={!complete}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}>
                {!complete && strokePathD && (
                  <path
                    d={strokePathD}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth={Math.max(10, letter.strokeWidth * 0.45)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.95}
                    pointerEvents="none"
                  />
                )}
              </LetterStroke>
            </div>
          </div>
        </div>
      </div>
    </>
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
      {workspace}
    </section>
  );
}
