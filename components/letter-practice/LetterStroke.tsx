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
  /** 0 = hidden guide only, 1 = fully drawn */
  progress: number;
  /** Soft ghost outline so kids see the target shape */
  showGuide?: boolean;
  /** Smooth dashoffset transition (great for speak success; off for live tracing) */
  animateProgress?: boolean;
  className?: string;
  pathRef?: RefObject<SVGPathElement | null>;
  svgRef?: RefObject<SVGSVGElement | null>;
  /** Extra layers rendered inside the SVG (e.g. user stroke) */
  children?: ReactNode;
  onPointerDown?: PointerEventHandler<SVGSVGElement>;
  onPointerMove?: PointerEventHandler<SVGSVGElement>;
  onPointerUp?: PointerEventHandler<SVGSVGElement>;
  onPointerCancel?: PointerEventHandler<SVGSVGElement>;
  interactive?: boolean;
};

export function LetterStroke({
  letter,
  progress,
  showGuide = true,
  animateProgress = true,
  className = "",
  pathRef,
  svgRef,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  interactive = false,
}: LetterStrokeProps) {
  const localPathRef = useRef<SVGPathElement | null>(null);
  const resolvedPathRef = pathRef ?? localPathRef;
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const path = resolvedPathRef.current;
    if (!path) return;
    setPathLength(path.getTotalLength());
  }, [letter.strokePath, resolvedPathRef]);

  const clamped = Math.min(1, Math.max(0, progress));
  const dashOffset = pathLength * (1 - clamped);

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
        aria-label={`Letter ${letter.letter}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ cursor: interactive ? "crosshair" : "default" }}
      >
        {showGuide && (
          <path
            d={letter.strokePath}
            fill="none"
            stroke="rgba(15, 61, 54, 0.12)"
            strokeWidth={letter.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Progress fill that follows the letter path */}
        <path
          ref={resolvedPathRef}
          d={letter.strokePath}
          fill="none"
          stroke="#0D9488"
          strokeWidth={letter.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength || 1}
          strokeDashoffset={dashOffset}
          style={{
            transition: animateProgress
              ? "stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        />

        {children}
      </svg>
    </motion.div>
  );
}
