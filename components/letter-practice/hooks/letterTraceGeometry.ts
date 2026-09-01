export type Point = { x: number; y: number };

export function distance(a: Point, b: Point) {
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
      const p = run[0];
      parts.push(`M ${p.x.toFixed(1)} ${p.y.toFixed(1)} l 0.01 0`);
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
