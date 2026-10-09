import type { ReactNode } from "react";

type LetterStrokeFrameProps = {
  wideLetter?: boolean;
  withCueImages?: boolean;
  /** Match the letter ink aspect so it can fill the card without distortion. */
  fitAspectRatio?: number;
  toolbar?: ReactNode;
  /** Drawn inside the card (e.g. feedback badge), above the letter. */
  overlay?: ReactNode;
  children: ReactNode;
};

export function LetterStrokeFrame({
  wideLetter = false,
  withCueImages = false,
  fitAspectRatio,
  toolbar,
  overlay,
  children,
}: LetterStrokeFrameProps) {
  const maxWidth = withCueImages
    ? "max-w-none sm:max-w-lg md:max-w-xl"
    : wideLetter
      ? "max-w-none sm:max-w-xl"
      : "max-w-none sm:max-w-md md:max-w-lg";

  const innerWidth = withCueImages || wideLetter ? "w-[92%]" : "w-[86%] sm:w-[78%]";

  return (
    <div className="flex h-full min-h-0 w-full snap-start snap-always flex-col items-center gap-2 md:snap-align-none md:snap-normal">
      {toolbar && (
        <div className="flex min-h-10 shrink-0 items-center justify-center sm:min-h-13">
          {toolbar}
        </div>
      )}
      <div className={`relative min-h-0 w-full flex-1 ${maxWidth}`}>
        <div className="absolute inset-0 rounded-4xl bg-white/55 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm" />
        {fitAspectRatio ? (
          <div
            className="absolute inset-x-[3%] top-[2%] bottom-[4%] grid place-items-center overflow-hidden"
            style={{ containerType: "size" }}>
            {/* Size from both axes. Width-only + aspect-ratio ignores the short
                mobile card and the artboard spills into the gap between cards. */}
            <div
              className="min-h-0 min-w-0"
              style={{
                aspectRatio: fitAspectRatio,
                width: `min(100cqw, calc(100cqh * ${fitAspectRatio}))`,
                height: `min(100cqh, calc(100cqw / ${fitAspectRatio}))`,
              }}>
              {children}
            </div>
          </div>
        ) : (
          <div
            className={`absolute top-[2%] bottom-[6%] left-1/2 -translate-x-1/2 ${innerWidth}`}>
            {children}
          </div>
        )}
        {overlay}
      </div>
    </div>
  );
}
