import type { ReactNode } from "react";

type LetterStrokeFrameProps = {
  wideLetter?: boolean;
  withCueImages?: boolean;
  /** Match the letter ink aspect so it can fill the card without distortion. */
  fitAspectRatio?: number;
  toolbar?: ReactNode;
  children: ReactNode;
};

export function LetterStrokeFrame({
  wideLetter = false,
  withCueImages = false,
  fitAspectRatio,
  toolbar,
  children,
}: LetterStrokeFrameProps) {
  const maxWidth = withCueImages
    ? "max-w-lg sm:max-w-xl"
    : wideLetter
      ? "max-w-xl"
      : "max-w-md sm:max-w-lg";

  const innerWidth = withCueImages || wideLetter ? "w-[90%]" : "w-[78%]";

  return (
    <div className="flex min-h-0 flex-col items-center gap-2">
      {toolbar && (
        <div className="flex min-h-13 shrink-0 items-center justify-center">
          {toolbar}
        </div>
      )}
      <div className={`relative min-h-0 w-full flex-1 ${maxWidth}`}>
        <div className="absolute inset-0 rounded-4xl bg-white/55 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm" />
        {fitAspectRatio ? (
          <div className="absolute inset-x-[3%] top-[2%] bottom-[4%] grid place-items-center">
            <div
              className="min-h-0 min-w-0 w-full"
              style={{ aspectRatio: fitAspectRatio, maxHeight: "100%" }}>
              {children}
            </div>
          </div>
        ) : (
          <div
            className={`absolute top-[2%] bottom-[6%] left-1/2 -translate-x-1/2 ${innerWidth}`}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
