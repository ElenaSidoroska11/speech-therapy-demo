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

export type Point = { x: number; y: number };

function distance(a: Point, b: Point) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/** Sample evenly spaced points along an SVG path element. */
export function samplePathPoints(
  path: SVGPathElement,
  sampleCount = 64,
): Point[] {
  const length = path.getTotalLength();
  if (length <= 0) return [];
  const points: Point[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const pt = path.getPointAtLength((i / (sampleCount - 1)) * length);
    points.push({ x: pt.x, y: pt.y });
  }
  return points;
}

export type UseLetterTraceOptions = {
  pathRef: RefObject<SVGPathElement | null>;
  svgRef: RefObject<SVGSVGElement | null>;
  tolerance: number;
  coverageThreshold: number;
  /** Change when the letter path changes so samples are rebuilt */
  pathKey?: string;
  enabled?: boolean;
  onComplete?: () => void;
};

export function useLetterTrace({
  pathRef,
  svgRef,
  tolerance,
  coverageThreshold,
  pathKey,
  enabled = true,
  onComplete,
}: UseLetterTraceOptions) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokePoints, setStrokePoints] = useState<Point[]>([]);
  const [covered, setCovered] = useState<boolean[]>([]);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [offPath, setOffPath] = useState(false);

  const coveredRef = useRef<boolean[]>([]);
  const samplesRef = useRef<Point[]>([]);
  const drawingRef = useRef(false);
  const completeRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const rebuildSamples = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const samples = samplePathPoints(path, 72);
    samplesRef.current = samples;
    coveredRef.current = samples.map(() => false);
    completeRef.current = false;
    setCovered(coveredRef.current);
    setProgress(0);
    setComplete(false);
    setStrokePoints([]);
    setOffPath(false);
    setIsDrawing(false);
    drawingRef.current = false;
  }, [pathRef]);

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
      const samples = samplesRef.current;
      if (!samples.length) return;

      let nearest = -1;
      let nearestDist = Infinity;
      for (let i = 0; i < samples.length; i++) {
        const d = distance(point, samples[i]);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = i;
        }
      }

      if (nearest < 0 || nearestDist > tolerance) {
        setOffPath(true);
        return;
      }

      setOffPath(false);
      const next = [...coveredRef.current];
      const radius = 2;
      for (
        let i = Math.max(0, nearest - radius);
        i <= Math.min(samples.length - 1, nearest + radius);
        i++
      ) {
        if (distance(point, samples[i]) <= tolerance) {
          next[i] = true;
        }
      }
      coveredRef.current = next;
      setCovered(next);

      const hit = next.filter(Boolean).length;
      const ratio = hit / next.length;
      setProgress(ratio);

      if (!completeRef.current && ratio >= coverageThreshold) {
        completeRef.current = true;
        setComplete(true);
        drawingRef.current = false;
        setIsDrawing(false);
        onCompleteRef.current?.();
      }
    },
    [tolerance, coverageThreshold],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (!enabled || completeRef.current) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      drawingRef.current = true;
      setIsDrawing(true);
      const point = clientToSvg(event.clientX, event.clientY);
      if (!point) return;
      setStrokePoints([point]);
      markCoverage(point);
    },
    [enabled, clientToSvg, markCoverage],
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

  const endStroke = useCallback((event: PointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    drawingRef.current = false;
    setIsDrawing(false);
    setOffPath(false);
  }, []);

  const reset = useCallback(() => {
    rebuildSamples();
  }, [rebuildSamples]);

  const strokePathD = useMemo(() => {
    if (strokePoints.length < 2) return "";
    return strokePoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");
  }, [strokePoints]);

  return {
    isDrawing,
    progress,
    complete,
    offPath,
    covered,
    strokePathD,
    onPointerDown,
    onPointerMove,
    onPointerUp: endStroke,
    onPointerCancel: endStroke,
    reset,
  };
}
