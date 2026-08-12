"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEventHandler,
  type ReactNode,
  type RefObject,
} from "react";
import { motion } from "framer-motion";
import type { LetterDefinition } from "./letters/types";

type LetterStrokeProps = {
  letter: LetterDefinition;
  /**
   * Overall draw progress 0–1 (speak success).
   * Spread across paths in order (w then h for digraphs).
   * Not used when `coveragePaths` is set (live tracing).
   */
  progress?: number;
  /**
   * Per-path teal fill built only from samples the kid touched.
   * Prefer this over sequential dashoffset for tracing.
   */
  coveragePaths?: string[];
  /** Soft ghost outline so kids see the target shape */
  showGuide?: boolean;
  /** Smooth dashoffset transition (great for speak success; off for live tracing) */
  animateProgress?: boolean;
  className?: string;
  /** Measure path elements, one per stroke path — used by the tracer */
  pathRefs?: RefObject<(SVGPathElement | null)[]>;
  svgRef?: RefObject<SVGSVGElement | null>;
  /** Extra layers rendered inside the SVG (e.g. user stroke) */
  children?: ReactNode;
  onPointerDown?: PointerEventHandler<SVGSVGElement>;
  onPointerMove?: PointerEventHandler<SVGSVGElement>;
  onPointerUp?: PointerEventHandler<SVGSVGElement>;
  onPointerCancel?: PointerEventHandler<SVGSVGElement>;
  interactive?: boolean;
};

/** Map a single 0–1 progress across N paths in sequence (speak animation). */
function progressForPath(overall: number, index: number, pathCount: number) {
  if (pathCount <= 1) return Math.min(1, Math.max(0, overall));
  const slice = 1 / pathCount;
  const local = (overall - index * slice) / slice;
  return Math.min(1, Math.max(0, local));
}

export function LetterStroke({
  letter,
  progress = 0,
  coveragePaths,
  showGuide = true,
  animateProgress = true,
  className = "",
  pathRefs,
  svgRef,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  interactive = false,
}: LetterStrokeProps) {
  const paths = letter.strokePaths;
  const localFillRefs = useRef<(SVGPathElement | null)[]>([]);
  const [pathLengths, setPathLengths] = useState<number[]>(() =>
    paths.map(() => 0),
  );
  /** Which letter the current pathLengths were measured for (avoids stale lengths). */
  const [measuredForId, setMeasuredForId] = useState<string | null>(null);
  const useCoverageFill = coveragePaths != null;
  // Lengths start unmeasured and are read after paint. Until ready, keep the
  // teal fill hidden so the stroke cannot "draw itself" on page open.
  const lengthsReady =
    measuredForId === letter.id &&
    pathLengths.length === paths.length &&
    pathLengths.every((l) => l > 0);
  // Only ease dashoffset when progress moves (speak success), never when
  // measured path length first lands (that would look like auto-draw).
  const shouldAnimateProgress = animateProgress && lengthsReady && progress > 0;

  useEffect(() => {
    localFillRefs.current = localFillRefs.current.slice(0, paths.length);
    setMeasuredForId(null);
    setPathLengths(paths.map(() => 0));
    const id = window.requestAnimationFrame(() => {
      setPathLengths(
        paths.map((_, i) => {
          const el = localFillRefs.current[i];
          return el ? el.getTotalLength() : 0;
        }),
      );
      setMeasuredForId(letter.id);
    });
    return () => window.cancelAnimationFrame(id);
  }, [paths, letter.id]);

  return (
    <motion.div
      className={`h-full w-full ${className}`}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <svg
        ref={svgRef}
        viewBox={letter.viewBox}
        className="h-full w-full touch-none select-none"
        role="img"
        aria-label={`Practice shape ${letter.letter}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ cursor: interactive ? "crosshair" : "default" }}
      >
        {showGuide &&
          paths.map((d, i) => (
            <path
              key={`guide-${i}`}
              d={d}
              fill="none"
              stroke="rgba(15, 61, 54, 0.12)"
              strokeWidth={letter.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

        {/* Measure paths (always mounted) — also speak fill when not tracing */}
        {paths.map((d, i) => {
          const fill = progressForPath(progress, i, paths.length);
          const clamped = Math.min(1, Math.max(0, fill));
          const length = lengthsReady ? (pathLengths[i] ?? 0) : 0;
          const measured = length > 0;
          // Fully hidden until measured; then hide by dashoffset when progress is 0
          const dashOffset = measured ? length * (1 - clamped) : 0;

          return (
            <path
              key={`measure-${i}`}
              ref={(el) => {
                localFillRefs.current[i] = el;
                if (pathRefs) pathRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke={
                useCoverageFill || !measured ? "transparent" : "#0D9488"
              }
              strokeWidth={letter.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={useCoverageFill || !measured ? undefined : length}
              strokeDashoffset={
                useCoverageFill || !measured ? undefined : dashOffset
              }
              style={
                useCoverageFill
                  ? undefined
                  : {
                      transition: shouldAnimateProgress
                        ? "stroke-dashoffset 3.5s cubic-bezier(0.4, 0, 0.2, 1)"
                        : "none",
                    }
              }
              pointerEvents="none"
            />
          );
        })}

        {/* Trace fill — only the segments the kid has covered */}
        {useCoverageFill &&
          coveragePaths.map((d, i) =>
            d ? (
              <path
                key={`covered-${i}`}
                d={d}
                fill="none"
                stroke="#0D9488"
                strokeWidth={letter.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                pointerEvents="none"
              />
            ) : null,
          )}

        {children}
      </svg>
    </motion.div>
  );
}
