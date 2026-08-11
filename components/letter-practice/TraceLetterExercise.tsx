"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CelebrationBurst } from "@/components/animal-match/CelebrationBurst";
import {
  playCelebration,
  playSuccessChime,
} from "@/components/animal-match/sounds";
import { FeedbackBanner } from "./FeedbackBanner";
import { LetterStroke } from "./LetterStroke";
import { useLetterTrace } from "./hooks/useLetterTrace";
import {
  AVAILABLE_LETTERS,
  getLetter,
  getNextLetter,
  type LetterId,
} from "./letters";

type TraceLetterExerciseProps = {
  initialLetter?: LetterId;
  onNextLetter?: (letterId: LetterId) => void;
};

export function TraceLetterExercise({
  initialLetter = "S",
  onNextLetter,
}: TraceLetterExerciseProps) {
  const [letterId, setLetterId] = useState<LetterId>(initialLetter);
  const [session, setSession] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const letter = getLetter(letterId);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const handleComplete = useCallback(() => {
    setCelebrate(true);
    playSuccessChime();
    window.setTimeout(() => playCelebration(), 280);
  }, []);

  const {
    progress,
    complete,
    offPath,
    strokePathD,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    reset,
  } = useLetterTrace({
    pathRef,
    svgRef,
    tolerance: letter.traceTolerance,
    coverageThreshold: letter.traceCoverage,
    pathKey: `${letter.strokePath}-${session}`,
    enabled: true,
    onComplete: handleComplete,
  });

  const feedback = complete
    ? "Great job!"
    : offPath
      ? "Stay on the path — you’ve got this!"
      : "Trace along the letter path";
  const feedbackTone = complete ? "success" : "hint";

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

  return (
    <section className="relative flex w-full max-w-3xl flex-col items-center gap-5 sm:gap-7">
      {celebrate && <CelebrationBurst />}

      <header className="text-center">
        <p className="font-(family-name:--font-display) text-sm font-semibold uppercase tracking-wide text-teal-800/70">
          Trace the letter
        </p>
        <h1 className="mt-1 font-(family-name:--font-display) text-3xl font-bold text-teal-950 sm:text-4xl">
          Trace “{letter.letter}”
        </h1>
        <p className="mt-2 max-w-md text-base font-semibold text-teal-900/70 sm:text-lg">
          Use your finger, stylus, or mouse to follow the letter path.
        </p>
      </header>

      {AVAILABLE_LETTERS.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {AVAILABLE_LETTERS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => selectLetter(id)}
              className={`rounded-xl px-3 py-1.5 text-sm font-extrabold ring-2 transition ${
                id === letterId
                  ? "bg-teal-600 text-white ring-white/70"
                  : "bg-white/70 text-teal-800 ring-white/50 hover:bg-white"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      )}

      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 rounded-4xl bg-white/55 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm" />
        <div className="relative aspect-5/7 w-full p-4 sm:p-6">
          <LetterStroke
            letter={letter}
            progress={progress}
            showGuide
            animateProgress={false}
            svgRef={svgRef}
            pathRef={pathRef}
            interactive={!complete}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            {strokePathD && (
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

      <div className="flex w-full max-w-md flex-col items-center gap-2">
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-white/70 ring-2 ring-white/60"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tracing progress"
        >
          <motion.div
            className="h-full rounded-full bg-teal-500"
            animate={{ width: `${percent}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
          />
        </div>
        <p className="text-sm font-bold text-teal-900/60">{percent}% traced</p>
      </div>

      <FeedbackBanner message={feedback} tone={feedbackTone} />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={clearTrace}
          className="inline-flex items-center gap-2 rounded-2xl bg-white/85 px-4 py-3 text-sm font-extrabold text-teal-800 shadow-md ring-2 ring-white/70"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </motion.button>

        {complete && nextLetter && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              selectLetter(nextLetter);
              onNextLetter?.(nextLetter);
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_0_#0F766E]"
          >
            Next letter
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}

        {complete && !nextLetter && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={clearTrace}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_0_#0284C7]"
          >
            Practice again
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </section>
  );
}
