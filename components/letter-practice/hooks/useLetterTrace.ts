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

/**
 * Build a stroke that only covers samples the kid has touched.
 * (Unlike dashoffset fill, this does not light up the start of the path.)
 */
export function coveredSegmentsPath(
  samples: Point[],
  covered: boolean[],
): string {
  if (!samples.length) return "";
  const parts: string[] = [];
  let run: Point[] = [];

  const flush = () => {
    if (run.length === 0) return;
    if (run.length === 1) {
      // Tiny dab so a single covered sample still shows
      const p = run[0];
      parts.push(
        `M ${p.x.toFixed(1)} ${p.y.toFixed(1)} l 0.01 0`,
      );
    } else {
      parts.push(
        run
          .map(
            (p, i) =>
              `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`,
          )
          .join(" "),
      );
    }
    run = [];
  };

  for (let i = 0; i < samples.length; i++) {
    if (covered[i]) {
      run.push(samples[i]);
    } else {
      flush();
    }
  }
  flush();
  return parts.join(" ");
}

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
}: UseLetterTraceOptions) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokePoints, setStrokePoints] = useState<Point[]>([]);
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
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const publishCoverage = useCallback((covered: boolean[][]) => {
    const samples = samplesRef.current;
    const ratios = covered.map((row, p) =>
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

  const rebuildSamples = useCallback(() => {
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
    setOffPath(false);
    setIsDrawing(false);
    drawingRef.current = false;
  }, [pathRefs, pathCount]);

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

      // Nearest sample across all letters/paths
      let bestPath = -1;
      let bestSample = -1;
      let nearestDist = Infinity;

      for (let p = 0; p < allSamples.length; p++) {
        const samples = allSamples[p];
        for (let i = 0; i < samples.length; i++) {
          const d = distance(point, samples[i]);
          if (d < nearestDist) {
            nearestDist = d;
            bestPath = p;
            bestSample = i;
          }
        }
      }

      if (bestPath < 0 || bestSample < 0 || nearestDist > tolerance) {
        setOffPath(true);
        return;
      }

      setOffPath(false);

      const pathSamples = allSamples[bestPath];
      const nextPathCovered = [...coveredRef.current[bestPath]];
      // Only mark samples truly near the pointer (no remote jumps along the path)
      for (let i = 0; i < pathSamples.length; i++) {
        if (distance(point, pathSamples[i]) <= tolerance) {
          nextPathCovered[i] = true;
        }
      }

      const nextAll = coveredRef.current.map((row, idx) =>
        idx === bestPath ? nextPathCovered : row,
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
    [tolerance, coverageThreshold, publishCoverage],
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
