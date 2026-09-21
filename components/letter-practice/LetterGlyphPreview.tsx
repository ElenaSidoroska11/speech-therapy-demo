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

/** Stroke thickness as a fraction of the preview crop — keeps tile weight even. */
const PREVIEW_STROKE_RATIO = 0.12;

/**
 * Compact SVG preview for picker tiles.
 * Crops to each glyph’s ink so every letter fills the tile at a similar size,
 * and uses a crop-relative stroke so short letters (a, c) don’t look thinner
 * or bolder than tall ones (b, d, h).
 */
export function LetterGlyphPreview({
  letter,
  className = "h-full w-full",
  stroke = "#FDA702",
}: LetterGlyphPreviewProps) {
  const bounds = boundsFromPaths(letter.strokePaths);
  // Pad from the letter’s real stroke so round caps aren’t clipped.
  const pad = letter.strokeWidth * 0.55;

  const { crop, previewStroke } = (() => {
    if (!bounds) {
      return {
        crop: letter.viewBox,
        previewStroke: letter.strokeWidth,
      };
    }
    const glyphW = bounds.maxX - bounds.minX;
    const glyphH = bounds.maxY - bounds.minY;
    const side = Math.max(glyphW, glyphH) + pad * 2;
    const cx = (bounds.minX + bounds.maxX) / 2;
    const cy = (bounds.minY + bounds.maxY) / 2;
    return {
      crop: `${cx - side / 2} ${cy - side / 2} ${side} ${side}`,
      previewStroke: side * PREVIEW_STROKE_RATIO,
    };
  })();

  return (
    <svg
      viewBox={crop}
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {letter.strokePaths.map((d, i) => (
        <path
          key={`${letter.id}-${i}`}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={previewStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
