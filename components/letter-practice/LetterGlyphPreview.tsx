import type { LetterDefinition } from "./letters/types";

type LetterGlyphPreviewProps = {
  letter: LetterDefinition;
  className?: string;
  stroke?: string;
};

/** Bounds from path coordinates (M/L/C/Q number pairs). */
function boundsFromPaths(paths: string[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const d of paths) {
    const nums =
      d.match(/[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)?.map(Number) ?? [];
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = nums[i]!;
      const y = nums[i + 1]!;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }

  if (!Number.isFinite(minX)) return null;
  return { minX, minY, maxX, maxY };
}

/**
 * Compact SVG preview for picker tiles.
 * Crops to each glyph’s ink bounds (not the shared practice artboard),
 * so narrow letters like h fill the tile at the same height as a/c/s.
 */
export function LetterGlyphPreview({
  letter,
  className = "h-full w-full",
  stroke = "#FDA702",
}: LetterGlyphPreviewProps) {
  const bounds = boundsFromPaths(letter.strokePaths);
  const pad = letter.strokeWidth * 0.55;

  const crop = (() => {
    if (!bounds) return letter.viewBox;
    const glyphW = bounds.maxX - bounds.minX;
    const glyphH = bounds.maxY - bounds.minY;
    const side = Math.max(glyphW, glyphH) + pad * 2;
    const cx = (bounds.minX + bounds.maxX) / 2;
    const cy = (bounds.minY + bounds.maxY) / 2;
    return `${cx - side / 2} ${cy - side / 2} ${side} ${side}`;
  })();

  return (
    <svg
      viewBox={crop}
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet">
      {letter.strokePaths.map((d, i) => (
        <path
          key={`${letter.id}-${i}`}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={letter.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
