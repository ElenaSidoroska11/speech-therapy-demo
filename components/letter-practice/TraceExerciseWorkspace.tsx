"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { memo, type RefObject } from "react";
import { LetterStroke } from "./LetterStroke";
import { LetterStrokeFrame } from "./LetterStrokeFrame";
import { TraceExerciseActions } from "./TraceExerciseActions";
import type { LetterDefinition, LetterId } from "./letters";
import {
  ERROR_PULSE_DURATION_S,
  ERROR_PULSE_REPEAT,
  ERROR_PULSE_REPEAT_DELAY_S,
  type useLetterTrace,
} from "./hooks/useLetterTrace";

type TraceHandlers = Pick<
  ReturnType<typeof useLetterTrace>,
  | "strokePathD"
  | "onPointerDown"
  | "onPointerMove"
  | "onPointerUp"
  | "onPointerCancel"
>;

type TraceExerciseWorkspaceProps = {
  letter: LetterDefinition;
  wideLetter: boolean;
  complete: boolean;
  progress: number;
  nextLetter: LetterId | null;
  demoProgress: number;
  errorPulse?: number;
  svgRef: RefObject<SVGSVGElement | null>;
  pathRefs: RefObject<(SVGPathElement | null)[]>;
  onDemoMeasured: () => void;
  onReplayDemo: () => void;
  onClear: () => void;
  onNext: (id: LetterId) => void;
  trace: TraceHandlers;
};

/** Keeps the left demo from re-rendering when the right-hand trace updates. */
const DemoLetterStroke = memo(LetterStroke);

export function TraceExerciseWorkspace({
  letter,
  wideLetter,
  complete,
  progress,
  nextLetter,
  demoProgress,
  errorPulse = 0,
  svgRef,
  pathRefs,
  onDemoMeasured,
  onReplayDemo,
  onClear,
  onNext,
  trace,
}: TraceExerciseWorkspaceProps) {
  const { strokePathD, onPointerDown, onPointerMove, onPointerUp, onPointerCancel } =
    trace;
  const userStrokeWidth = Math.max(10, letter.strokeWidth * 0.45);

  return (
    <div className="relative min-h-0 w-full flex-1">
    <div className="absolute inset-0 snap-y snap-mandatory overflow-y-auto overscroll-y-contain md:grid md:snap-none md:grid-cols-2 md:grid-rows-[minmax(0,1fr)] md:gap-5 md:overflow-visible">
      <LetterStrokeFrame
        withCueImages={Boolean(letter.cueImages?.length)}
        wideLetter={wideLetter}
        fitAspectRatio={letter.fitAspectRatio}
        toolbar={
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onReplayDemo}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#e52328] px-3 py-2 font-extrabold text-white ring-2 ring-white/70 sm:gap-2 sm:px-4 sm:py-3">
            <RotateCcw className="h-5 w-5 text-white sm:h-7 sm:w-7" strokeWidth={3} />
            <span className="text-base leading-none sm:text-xl">Play</span>
          </motion.button>
        }>
        <DemoLetterStroke
          letter={letter}
          progress={demoProgress}
          showGuide
          showCueImages
          onMeasured={onDemoMeasured}
        />
      </LetterStrokeFrame>

      <LetterStrokeFrame
        wideLetter={wideLetter}
        fitAspectRatio={letter.fitAspectRatio}
        toolbar={
          <TraceExerciseActions
            complete={complete}
            progress={progress}
            nextLetter={nextLetter}
            onClear={onClear}
            onNext={onNext}
          />
        }
        overlay={
          errorPulse > 0 ? (
            <motion.div
              key={`try-again-${errorPulse}`}
              className="pointer-events-none absolute top-1/2 right-[4%] z-20 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.4, x: 10, rotate: -8 }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                scale: [0.4, 1.12, 0.94, 1.06, 0.9],
                x: [10, -4, 0, -2, 6],
                rotate: [-8, 6, -3, 3, 0],
              }}
              transition={{
                duration: 1.35,
                times: [0, 0.22, 0.45, 0.72, 1],
                ease: "easeOut",
              }}
              aria-live="polite">
              <span className="inline-block whitespace-nowrap rounded-xl bg-white/95 px-2.5 py-1 font-(family-name:--font-display) text-sm font-extrabold tracking-wide text-[#FDA702] shadow-[0_3px_0_rgba(253,167,2,0.35)] ring-2 ring-[#FDA702]/70 sm:px-3 sm:py-1.5 sm:text-base md:text-lg">
                Try again!
              </span>
            </motion.div>
          ) : null
        }>
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
            <motion.path
              key={errorPulse}
              d={strokePathD}
              fill="none"
              stroke="#F59E0B"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
              pointerEvents="none"
              initial={{ strokeWidth: userStrokeWidth, y: 0 }}
              animate={
                errorPulse > 0
                  ? {
                      y: [0, -14, 0, -7, 0],
                      strokeWidth: [
                        userStrokeWidth,
                        userStrokeWidth * 0.85,
                        userStrokeWidth * 1.15,
                        userStrokeWidth * 0.9,
                        userStrokeWidth,
                      ],
                    }
                  : { strokeWidth: userStrokeWidth, y: 0 }
              }
              transition={
                errorPulse > 0
                  ? {
                      duration: ERROR_PULSE_DURATION_S,
                      times: [0, 0.35, 0.55, 0.78, 1],
                      ease: ["easeOut", "easeIn", "easeOut", "easeIn", "easeOut"],
                      repeat: ERROR_PULSE_REPEAT,
                      repeatDelay: ERROR_PULSE_REPEAT_DELAY_S,
                    }
                  : { duration: 0 }
              }
            />
          )}
        </LetterStroke>
      </LetterStrokeFrame>
    </div>
    </div>
  );
}
