"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";
import {
  coveredSegmentsPath,
  distance,
  samplePathPoints,
  type Point,
} from "./letterTraceGeometry";

/** Orange error stroke pulse — keep clear delay matched to this. */
export const ERROR_PULSE_DURATION_S = 0.32;
export const ERROR_PULSE_REPEAT = 4;
export const ERROR_PULSE_REPEAT_DELAY_S = 0.04;
export const ERROR_PULSE_TOTAL_MS = Math.ceil(
  (ERROR_PULSE_REPEAT + 1) * ERROR_PULSE_DURATION_S * 1000 +
    ERROR_PULSE_REPEAT * ERROR_PULSE_REPEAT_DELAY_S * 1000,
);

export type { Point } from "./letterTraceGeometry";
export { coveredSegmentsPath, samplePathPoints } from "./letterTraceGeometry";

export type UseLetterTraceOptions = {
  /** Measure path elements — one per letter.strokePaths entry */
  pathRefs: RefObject<(SVGPathElement | null)[]>;
  svgRef: RefObject<SVGSVGElement | null>;
  pathCount: number;
  tolerance: number;
  coverageThreshold: number;
  /** Change when the letter paths change so samples are rebuilt */
  pathKey?: string;
  enabled?: boolean;
  onComplete?: () => void;
  /** Fires once each time the finger leaves the letter path (not every move). */
  onOffPath?: () => void;
  /** Fires when the user starts a new stroke (pointer down). */
  onStrokeStart?: () => void;
};

export function useLetterTrace({
  pathRefs,
  svgRef,
  pathCount,
  tolerance,
  coverageThreshold,
  pathKey,
  enabled = true,
  onComplete,
  onOffPath,
  onStrokeStart,
}: UseLetterTraceOptions) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokePoints, setStrokePoints] = useState<Point[]>([]);
  /** Finished freehand strokes kept on screen (same look as the live orange trail). */
  const [committedStrokePaths, setCommittedStrokePaths] = useState<string[]>([]);
  const [pathProgress, setPathProgress] = useState<number[]>(() =>
    Array.from({ length: pathCount }, () => 0),
  );
  /** Visible teal fill paths — only the parts actually traced */
  const [coveragePaths, setCoveragePaths] = useState<string[]>(() =>
    Array.from({ length: pathCount }, () => ""),
  );
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [offPath, setOffPath] = useState(false);

  /** covered[pathIndex][sampleIndex] */
  const coveredRef = useRef<boolean[][]>([]);
  const samplesRef = useRef<Point[][]>([]);
  const drawingRef = useRef(false);
  const completeRef = useRef(false);
  const offPathSignaledRef = useRef(false);
  const clearAttemptTimerRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onOffPathRef = useRef(onOffPath);
  const onStrokeStartRef = useRef(onStrokeStart);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    onOffPathRef.current = onOffPath;
  }, [onOffPath]);

  useEffect(() => {
    onStrokeStartRef.current = onStrokeStart;
  }, [onStrokeStart]);

  useEffect(() => {
    return () => {
      if (clearAttemptTimerRef.current != null) {
        window.clearTimeout(clearAttemptTimerRef.current);
      }
    };
  }, []);

  const publishCoverage = useCallback((covered: boolean[][]) => {
    const samples = samplesRef.current;
    const ratios = covered.map((row) =>
      row.length === 0 ? 0 : row.filter(Boolean).length / row.length,
    );
    setPathProgress(ratios);
    setCoveragePaths(
      samples.map((pts, p) => coveredSegmentsPath(pts, covered[p] ?? [])),
    );
    const overall =
      ratios.length === 0
        ? 0
        : ratios.reduce((sum, r) => sum + r, 0) / ratios.length;
    setProgress(overall);
    return ratios;
  }, []);

  /** Incorrect stroke — wipe ink + coverage so they can try again. */
  const clearAttempt = useCallback(() => {
    const covered = samplesRef.current.map((pts) => pts.map(() => false));
    coveredRef.current = covered;
    publishCoverage(covered);
    setStrokePoints([]);
    setCommittedStrokePaths([]);
    setOffPath(false);
    drawingRef.current = false;
    setIsDrawing(false);
    offPathSignaledRef.current = false;
  }, [publishCoverage]);

  const cancelPendingClear = useCallback(() => {
    if (clearAttemptTimerRef.current != null) {
      window.clearTimeout(clearAttemptTimerRef.current);
      clearAttemptTimerRef.current = null;
    }
  }, []);

  const rebuildSamples = useCallback(() => {
    cancelPendingClear();
    const els = pathRefs.current;
    if (!els) return;

    const samples: Point[][] = [];
    const covered: boolean[][] = [];

    for (let i = 0; i < pathCount; i++) {
      const path = els[i];
      if (!path) {
        samples.push([]);
        covered.push([]);
        continue;
      }
      const pts = samplePathPoints(path, 72);
      samples.push(pts);
      covered.push(pts.map(() => false));
    }

    samplesRef.current = samples;
    coveredRef.current = covered;
    completeRef.current = false;
    setPathProgress(samples.map(() => 0));
    setCoveragePaths(samples.map(() => ""));
    setProgress(0);
    setComplete(false);
    setStrokePoints([]);
    setCommittedStrokePaths([]);
    setOffPath(false);
    setIsDrawing(false);
    drawingRef.current = false;
    offPathSignaledRef.current = false;
  }, [pathRefs, pathCount, cancelPendingClear]);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => rebuildSamples());
    return () => window.cancelAnimationFrame(id);
  }, [rebuildSamples, pathKey]);

  const clientToSvg = useCallback(
    (clientX: number, clientY: number): Point | null => {
      const svg = svgRef.current;
      if (!svg) return null;
      const point = svg.createSVGPoint();
      point.x = clientX;
      point.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      const local = point.matrixTransform(ctm.inverse());
      return { x: local.x, y: local.y };
    },
    [svgRef],
  );

  const markCoverage = useCallback(
    (point: Point) => {
      const allSamples = samplesRef.current;
      if (!allSamples.length) return;

      // Nearest sample on every path (used to lock onto the active stroke).
      const pathNearest = allSamples.map((samples) => {
        let bestI = -1;
        let bestD = Infinity;
        for (let i = 0; i < samples.length; i++) {
          const d = distance(point, samples[i]!);
          if (d < bestD) {
            bestD = d;
            bestI = i;
          }
        }
        return { bestI, bestD };
      });

      // Credit the nearest incomplete stroke within tolerance (any order).
      // Strict first-to-last order broke digraphs like “th” when the crossbar
      // was drawn before/after the h. A local brush still prevents a single
      // pass through a crossing from completing a short crossbar.
      let activePath = -1;
      let activeBestD = Infinity;
      for (let i = 0; i < coveredRef.current.length; i++) {
        const row = coveredRef.current[i];
        if (!row || row.length === 0) continue;
        const ratio = row.filter(Boolean).length / row.length;
        if (ratio >= coverageThreshold) continue;
        const near = pathNearest[i];
        if (!near || near.bestI < 0 || near.bestD > tolerance) continue;
        if (near.bestD < activeBestD) {
          activeBestD = near.bestD;
          activePath = i;
        }
      }

      const onAnyPath = pathNearest.some((p) => p.bestD <= tolerance);

      // Truly off the letter → soft error. On a finished stroke only → ignore.
      if (!onAnyPath) {
        setOffPath(true);
        if (!offPathSignaledRef.current) {
          offPathSignaledRef.current = true;
          drawingRef.current = false;
          setIsDrawing(false);
          onOffPathRef.current?.();
          cancelPendingClear();
          clearAttemptTimerRef.current = window.setTimeout(() => {
            clearAttemptTimerRef.current = null;
            clearAttempt();
          }, ERROR_PULSE_TOTAL_MS);
        }
        return;
      }

      if (activePath < 0) {
        return;
      }

      const active = pathNearest[activePath];
      if (!active || active.bestI < 0) {
        return;
      }

      setOffPath(false);
      offPathSignaledRef.current = false;

      // Local brush only — don’t light up an entire short path from one touch.
      const pathSamples = allSamples[activePath]!;
      const brush = Math.max(2, Math.ceil(pathSamples.length * 0.05));
      const nextPathCovered = [...coveredRef.current[activePath]!];
      const lo = Math.max(0, active.bestI - brush);
      const hi = Math.min(pathSamples.length - 1, active.bestI + brush);
      for (let i = lo; i <= hi; i++) {
        if (distance(point, pathSamples[i]!) <= tolerance) {
          nextPathCovered[i] = true;
        }
      }

      const nextAll = coveredRef.current.map((row, idx) =>
        idx === activePath ? nextPathCovered : row,
      );
      coveredRef.current = nextAll;

      const ratios = publishCoverage(nextAll);
      const allDone =
        ratios.length > 0 && ratios.every((r) => r >= coverageThreshold);

      if (!completeRef.current && allDone) {
        completeRef.current = true;
        setComplete(true);
        drawingRef.current = false;
        setIsDrawing(false);
        onCompleteRef.current?.();
      }
    },
    [tolerance, coverageThreshold, publishCoverage, clearAttempt, cancelPendingClear],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (!enabled || completeRef.current) return;
      cancelPendingClear();
      if (offPathSignaledRef.current) {
        clearAttempt();
      }
      onStrokeStartRef.current?.();
      event.currentTarget.setPointerCapture(event.pointerId);
      drawingRef.current = true;
      setIsDrawing(true);
      const point = clientToSvg(event.clientX, event.clientY);
      if (!point) return;
      setStrokePoints([point]);
      markCoverage(point);
    },
    [enabled, clientToSvg, markCoverage, cancelPendingClear, clearAttempt],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (!drawingRef.current || !enabled || completeRef.current) return;
      const point = clientToSvg(event.clientX, event.clientY);
      if (!point) return;
      setStrokePoints((prev) => {
        const last = prev[prev.length - 1];
        if (last && distance(last, point) < 2) return prev;
        return [...prev, point];
      });
      markCoverage(point);
    },
    [enabled, clientToSvg, markCoverage],
  );

  const endStroke = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      drawingRef.current = false;
      setIsDrawing(false);
      // Off-path already scheduled clearAttempt after the error pulse — don't
      // wipe the orange stroke early when the pointer is released.
      if (offPathSignaledRef.current) {
        return;
      }
      // Keep finished freehand ink so multi-stroke letters (e.g. f) stay visible.
      setStrokePoints((points) => {
        if (points.length >= 2) {
          const d = points
            .map(
              (p, i) =>
                `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
            )
            .join(" ");
          setCommittedStrokePaths((prev) => [...prev, d]);
        }
        return [];
      });
      setOffPath(false);
    },
    [],
  );

  const reset = useCallback(() => {
    rebuildSamples();
  }, [rebuildSamples]);

  const liveStrokePathD = useMemo(() => {
    if (strokePoints.length < 2) return "";
    return strokePoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
  }, [strokePoints]);

  /** Committed strokes + the stroke currently being drawn (original orange trail look). */
  const strokePathD = useMemo(() => {
    if (liveStrokePathD) return [...committedStrokePaths, liveStrokePathD].join(" ");
    return committedStrokePaths.join(" ");
  }, [committedStrokePaths, liveStrokePathD]);

  return {
    isDrawing,
    progress,
    pathProgress,
    coveragePaths,
    complete,
    offPath,
    strokePathD,
    onPointerDown,
    onPointerMove,
    onPointerUp: endStroke,
    onPointerCancel: endStroke,
    reset,
  };
}
