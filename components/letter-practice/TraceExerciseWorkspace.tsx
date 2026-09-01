"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { RefObject } from "react";
import { LetterStroke } from "./LetterStroke";
import { LetterStrokeFrame } from "./LetterStrokeFrame";
import { TraceExerciseActions } from "./TraceExerciseActions";
import type { LetterDefinition, LetterId } from "./letters";
import type { useLetterTrace } from "./hooks/useLetterTrace";

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
  svgRef: RefObject<SVGSVGElement | null>;
  pathRefs: RefObject<(SVGPathElement | null)[]>;
  onDemoMeasured: () => void;
  onReplayDemo: () => void;
  onClear: () => void;
  onNext: (id: LetterId) => void;
  trace: TraceHandlers;
};

export function TraceExerciseWorkspace({
  letter,
  wideLetter,
  complete,
  progress,
  nextLetter,
  demoProgress,
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

  return (
    <div className="grid min-h-0 w-full flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-4 sm:grid-cols-2 sm:grid-rows-[minmax(0,1fr)] sm:gap-5">
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
            className="inline-flex items-center gap-2 rounded-2xl bg-[#e52328] px-4 py-3 font-extrabold text-white  ring-2 ring-white/70">
            <RotateCcw className="h-7 w-7 text-white" strokeWidth={3} />
            <span className="text-xl leading-none">Play</span>
          </motion.button>
        }>
        <LetterStroke
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
      </LetterStrokeFrame>
    </div>
  );
}
