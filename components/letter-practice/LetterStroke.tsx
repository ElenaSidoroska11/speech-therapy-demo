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
import {
  buildDirectionGuides,
  DirectionGuideLayer,
  type DirectionGuide,
} from "./DirectionGuides";
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
   * Per-path fill built only from samples the kid touched.
   * Prefer this over sequential dashoffset for tracing.
   */
  coveragePaths?: string[];
  /** Soft ghost outline so kids see the target shape */
  showGuide?: boolean;
  /** Start dot + numbered arrows along the stroke (tracing worksheet style) */
  showDirectionGuides?: boolean;
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
  /** Fires once path lengths are measured so a draw animation can start from empty. */
  onMeasured?: () => void;
  /** Draw letter-shaped cue pictures on the same handwriting lines as the letter */
  showCueImages?: boolean;
};

type RulingLines = {
  top: number;
  mid: number;
  baseline: number;
  bottom: number;
};

const RULING_EDGES = ["top", "mid", "baseline", "bottom"] as const;

/** When only a glyph bbox is known, invent equal mid/baseline/bottom guides. */
function rulingLinesFromBBox(top: number, bottom: number): RulingLines {
  const gap = (bottom - top) / 3;
  return {
    top,
    mid: top + gap,
    baseline: top + 2 * gap,
    bottom,
  };
}

function parseViewBox(viewBox: string) {
  const [x = 0, y = 0, width = 100, height = 100] = viewBox
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  return { x, y, width, height };
}

/** Map a single 0–1 progress across N paths in sequence (speak animation). */
function progressForPath(overall: number, index: number, pathCount: number) {
  if (pathCount <= 1) return Math.min(1, Math.max(0, overall));
  const slice = 1 / pathCount;
  const local = (overall - index * slice) / slice;
  return Math.min(1, Math.max(0, local));
}

/** Seconds to draw one stroke in the demo / speak fill animation. */
function strokeDrawDurationSec(pathCount: number) {
  // Single letters keep the slower full-path draw; multi-stroke letters
  // draw one stem at a time so kids see handwriting order.
  return pathCount <= 1 ? 3.5 : 1.05;
}

/** Orange demo / coverage fill is drawn thinner than the full letter width. */
const ORANGE_STROKE_SCALE = 0.4;
/** Soft gray guide outline under the orange stroke. */
const GUIDE_STROKE_SCALE = 0.75;

export function LetterStroke({
  letter,
  progress = 0,
  coveragePaths,
  showGuide = true,
  showDirectionGuides = false,
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
  onMeasured,
  showCueImages = false,
}: LetterStrokeProps) {
  const paths = letter.strokePaths;
  const localFillRefs = useRef<(SVGPathElement | null)[]>([]);
  const [pathLengths, setPathLengths] = useState<number[]>(() =>
    paths.map(() => 0),
  );
  /** Which letter the current pathLengths were measured for (avoids stale lengths). */
  const [measuredForId, setMeasuredForId] = useState<string | null>(null);
  /** Handwriting-paper 4-line guides (topline → bottomline) */
  const [rulingLines, setRulingLines] = useState<RulingLines | null>(null);
  const [directionGuides, setDirectionGuides] = useState<DirectionGuide[]>([]);
  const letterBox = parseViewBox(letter.viewBox);
  const cueImages = showCueImages ? letter.cueImages ?? [] : [];
  const cueSlotWidth = cueImages.length > 0 ? letterBox.height * 0.9 : 0;
  const cueGap = cueImages.length > 0 ? Math.max(12, letterBox.width * 0.06) : 0;
  const extraLeft =
    cueImages.length > 0 ? cueSlotWidth * cueImages.length + cueGap : 0;
  const viewBox = {
    x: letterBox.x - extraLeft,
    y: letterBox.y,
    width: letterBox.width + extraLeft,
    height: letterBox.height,
  };
  const useCoverageFill = coveragePaths != null;
  // Lengths start unmeasured and are read after paint. Until ready, keep the
  // fill hidden so the stroke cannot "draw itself" on page open.
  const lengthsReady =
    measuredForId === letter.id &&
    pathLengths.length === paths.length &&
    pathLengths.every((l) => l > 0);
  // Only ease dashoffset when progress moves (speak success), never when
  // measured path length first lands (that would look like auto-draw).
  const shouldAnimateProgress = animateProgress && lengthsReady && progress > 0;
  const onMeasuredRef = useRef(onMeasured);
  onMeasuredRef.current = onMeasured;

  useEffect(() => {
    localFillRefs.current = localFillRefs.current.slice(0, paths.length);
    setMeasuredForId(null);
    setPathLengths(paths.map(() => 0));
    setRulingLines(null);
    setDirectionGuides([]);
    const id = window.requestAnimationFrame(() => {
      let top = Infinity;
      let bottom = -Infinity;

      const halfStroke = letter.strokeWidth / 2;

      const lengths = paths.map((_, i) => {
        const el = localFillRefs.current[i];
        if (!el) return 0;
        const box = el.getBBox();
        // getBBox() is the path centerline — include half the stroke so lines
        // sit where the visible letter actually starts and ends.
        top = Math.min(top, box.y - halfStroke);
        bottom = Math.max(bottom, box.y + box.height + halfStroke);
        return el.getTotalLength();
      });

      setPathLengths(lengths);
      // Prefer fixed artboard rulings so every letter shares the same
      // 4-line worksheet (topline / midline / baseline / bottomline).
      setRulingLines(
        letter.rulingLines ??
          (top !== Infinity ? rulingLinesFromBBox(top, bottom) : null),
      );
      setDirectionGuides(
        showDirectionGuides
          ? buildDirectionGuides(
              localFillRefs.current,
              lengths,
              letter.directionArrowFractions ?? [],
            )
          : [],
      );
      setMeasuredForId(letter.id);
    });
    return () => window.cancelAnimationFrame(id);
  }, [
    paths,
    letter.id,
    letter.strokeWidth,
    letter.rulingLines,
    letter.directionArrowFractions,
    showDirectionGuides,
  ]);

  useEffect(() => {
    if (!lengthsReady) return;
    onMeasuredRef.current?.();
  }, [lengthsReady]);

  return (
    <motion.div
      className={`h-full w-full ${className}`}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className={`h-full w-full select-none ${interactive ? "touch-none" : "touch-pan-y"}`}
        role="img"
        aria-label={`Practice shape ${letter.letter}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ cursor: interactive ? "crosshair" : "default" }}
      >
        {showGuide &&
          rulingLines &&
          RULING_EDGES.map((edge) => {
            const isBaseline = edge === "baseline";
            return (
              <line
                key={`ruling-${edge}`}
                x1={viewBox.x}
                y1={rulingLines[edge]}
                x2={viewBox.x + viewBox.width}
                y2={rulingLines[edge]}
                stroke="rgba(15, 61, 54, 0.22)"
                strokeWidth={isBaseline ? 2.25 : 1.5}
                strokeDasharray={isBaseline ? undefined : "3 7"}
                strokeLinecap="round"
                pointerEvents="none"
              />
            );
          })}

        {showGuide &&
          rulingLines &&
          cueImages.map((img, i) => {
            const height = rulingLines.bottom - rulingLines.top;
            return (
              <image
                key={`cue-${img.src}`}
                href={img.src}
                x={viewBox.x + i * cueSlotWidth}
                y={rulingLines.top}
                width={cueSlotWidth}
                height={height}
                preserveAspectRatio="xMidYMid meet"
                pointerEvents="none"
                aria-label={img.alt}
              />
            );
          })}

        {showGuide &&
          paths.map((d, i) => (
            <path
              key={`guide-${i}`}
              d={d}
              fill="none"
              stroke="rgba(15, 61, 54, 0.12)"
              strokeWidth={letter.strokeWidth * GUIDE_STROKE_SCALE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

        {showDirectionGuides &&
          paths.map((d, i) => (
            <path
              key={`centerline-${i}`}
              d={d}
              fill="none"
              stroke="rgba(15, 61, 54, 0.38)"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              pointerEvents="none"
            />
          ))}

        {/* Measure paths (always mounted) — also speak/demo fill when not tracing */}
        {paths.map((d, i) => {
          const fill = progressForPath(progress, i, paths.length);
          const clamped = Math.min(1, Math.max(0, fill));
          const length = lengthsReady ? (pathLengths[i] ?? 0) : 0;
          const measured = length > 0;
          // Fully hidden until measured; then hide by dashoffset when progress is 0
          const dashOffset = measured ? length * (1 - clamped) : 0;
          const drawSec = strokeDrawDurationSec(paths.length);
          // Stagger multi-stroke letters so stems draw in writing order, not together
          const drawDelaySec =
            shouldAnimateProgress && paths.length > 1 ? i * drawSec : 0;

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
                useCoverageFill || !measured ? "transparent" : "#FDA702"
              }
              strokeWidth={letter.strokeWidth * ORANGE_STROKE_SCALE}
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
                        ? `stroke-dashoffset ${drawSec}s cubic-bezier(0.4, 0, 0.2, 1) ${drawDelaySec}s`
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
                stroke="#FDA702"
                strokeWidth={letter.strokeWidth * ORANGE_STROKE_SCALE}
                strokeLinecap="round"
                strokeLinejoin="round"
                pointerEvents="none"
              />
            ) : null,
          )}

        {children}

        {showDirectionGuides && directionGuides.length > 0 && (
          <DirectionGuideLayer
            guides={directionGuides}
            strokeWidth={letter.strokeWidth}
          />
        )}
      </svg>
    </motion.div>
  );
}
