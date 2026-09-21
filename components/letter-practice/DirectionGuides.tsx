type StartGuide = {
  kind: "start";
  x: number;
  y: number;
};

type ArrowGuide = {
  kind: "arrow";
  x: number;
  y: number;
  angleDeg: number;
  label: string;
};

export type DirectionGuide = StartGuide | ArrowGuide;

/** Pull the start dot slightly before the stroke so it reads like a worksheet pencil mark. */
function startDotPoint(el: SVGPathElement, length: number) {
  const start = el.getPointAtLength(0);
  const step = Math.min(10, Math.max(3, length * 0.015));
  const next = el.getPointAtLength(step);
  const angle = Math.atan2(next.y - start.y, next.x - start.x);
  // Keep the offset small so tall letters (h, b, d) don’t place the
  // dot above the topline / outside the writing band.
  const offset = Math.min(6, Math.max(3, length * 0.012));
  return {
    x: start.x - Math.cos(angle) * offset,
    y: start.y - Math.sin(angle) * offset,
  };
}

/**
 * Worksheet-style start dots and numbered arrows along stroke paths.
 * `fractions` are 0–1 along a path.
 * - One path (e.g. S): every fraction is an arrow on that path.
 * - Several paths (e.g. M): `fractions[i]` is the arrow on path i
 *   (falls back to `fractions[0]` or a default if shorter).
 * Only the first path gets a start dot — that’s where writing begins.
 * The dot is offset slightly before the stroke so it stays visible beside arrow 1.
 */
export function buildDirectionGuides(
  pathEls: (SVGPathElement | null)[],
  lengths: number[],
  fractions: number[],
): DirectionGuide[] {
  const guides: DirectionGuide[] = [];
  let label = 1;
  let placedStart = false;
  const multiStroke = pathEls.filter(Boolean).length > 1;

  pathEls.forEach((el, pathIndex) => {
    const length = lengths[pathIndex] ?? 0;
    if (!el || length <= 0) return;

    const pointAt = (dist: number) =>
      el.getPointAtLength(Math.max(0, Math.min(length, dist)));
    const angleAt = (dist: number) => {
      const step = Math.min(12, Math.max(4, length * 0.02));
      const d = Math.min(length - step, Math.max(0, dist));
      const a = pointAt(d);
      const b = pointAt(d + step);
      return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    };

    // One start dot at the beginning of the letter (first stroke only)
    if (!placedStart) {
      const start = startDotPoint(el, length);
      guides.push({ kind: "start", x: start.x, y: start.y });
      placedStart = true;
    }

    const arrowFractions = multiStroke
      ? [
          fractions[pathIndex] ??
            fractions[0] ??
            defaultFractions(length)[0] ??
            0.4,
        ]
      : fractions.length > 0
        ? fractions
        : defaultFractions(length);

    for (const t of arrowFractions) {
      const dist = length * t;
      const p = pointAt(dist);
      guides.push({
        kind: "arrow",
        x: p.x,
        y: p.y,
        angleDeg: angleAt(dist),
        label: String(label++),
      });
    }
  });

  return guides;
}

function defaultFractions(length: number) {
  return length > 160 ? [0.13, 0.64] : [0.4];
}

export function DirectionGuideLayer({
  guides,
  strokeWidth,
}: {
  guides: DirectionGuide[];
  strokeWidth: number;
}) {
  const scale = Math.max(0.8, Math.min(1.2, strokeWidth / 28));
  const dotR = 7 * scale;
  const fontSize = 15 * scale;

  return (
    <g pointerEvents="none" aria-hidden>
      {guides.map((guide, i) =>
        guide.kind === "start" ? (
          <circle
            key={`start-${i}`}
            cx={guide.x}
            cy={guide.y}
            r={dotR}
            fill="#134E4A"
            stroke="#fff"
            strokeWidth={1.8 * scale}
          />
        ) : (
          <g
            key={`arrow-${i}`}
            transform={`translate(${guide.x} ${guide.y}) rotate(${guide.angleDeg})`}
          >
            <polygon
              points={`${14 * scale},0 ${-8 * scale},${-8.5 * scale} ${-8 * scale},${8.5 * scale}`}
              fill="#134E4A"
              stroke="#fff"
              strokeWidth={1.4 * scale}
              strokeLinejoin="round"
            />
            {/* Offset with the stroke, then unrotate so the digit stays upright. */}
            <g transform={`translate(${-2 * scale} ${-16 * scale})`}>
              <text
                x={0}
                y={0}
                transform={`rotate(${-guide.angleDeg})`}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={fontSize}
                fontWeight={800}
                fill="#134E4A"
                stroke="#fff"
                strokeWidth={3.5 * scale}
                paintOrder="stroke"
                style={{ fontFamily: "var(--font-display), ui-rounded, sans-serif" }}
              >
                {guide.label}
              </text>
            </g>
          </g>
        ),
      )}
    </g>
  );
}
