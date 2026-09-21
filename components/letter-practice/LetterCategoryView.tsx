"use client";

import {
  CENTER_BODY_SLOT,
  CENTER_CONTENT_WIDTH,
  CENTER_TITLE_SLOT,
  HomeTitleHeightSpacer,
} from "@/components/HomeLanding";
import { LetterPicker } from "./LetterPicker";
import { LETTER_STYLES, type LetterStyle } from "./letterStyles";
import type { LetterId } from "./letters";

type LetterCategoryViewProps = {
  style: LetterStyle | null;
  onSelectLetter: (id: LetterId) => void;
};

function StyleCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-2xl rounded-4xl bg-white/55 p-3.5 pt-4 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-white/70 backdrop-blur-sm sm:p-5 sm:pt-5">
      <h2 className="mb-3.5 text-center font-(family-name:--font-display) text-xl font-extrabold tracking-wide text-[#e52328] drop-shadow-[0_2px_0_rgba(15,118,110,0.25)] sm:mb-4 sm:text-2xl md:text-3xl">
        {title}
      </h2>
      {children}
    </div>
  );
}

/** Letter style selection — one expanded card for the active sidebar style. */
export function LetterCategoryView({ style, onSelectLetter }: LetterCategoryViewProps) {
  const styleLabel = LETTER_STYLES.find((s) => s.id === style)?.label;

  return (
    <>
      <div className={`${CENTER_TITLE_SLOT} relative flex flex-col items-center justify-center`}>
        <HomeTitleHeightSpacer />
        <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 sm:inset-x-6 sm:gap-4">
          <header className="shrink-0 text-center">
            <p className="max-w-lg font-(family-name:--font-display) text-xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_3px_0_rgba(15,118,110,0.25)] sm:mt-3 sm:max-w-2xl sm:text-3xl md:max-w-3xl md:text-4xl">
              {style
                ? "Choose a letter to start practicing"
                : "Choose a letter style and letter to practice."}
            </p>
          </header>
        </div>
      </div>

      <div className={CENTER_BODY_SLOT}>
        <div className={CENTER_CONTENT_WIDTH}>
          <div className="relative">
            <div className="relative aspect-16/10 w-full min-h-48 sm:min-h-0">
              <div className="absolute inset-0 flex min-h-0 items-start justify-center">
                {style && styleLabel ? (
                  <StyleCard title={styleLabel}>
                    {style === "victorian" ? (
                      <LetterPicker
                        variant="sidebar"
                        display="glyph"
                        onSelect={onSelectLetter}
                      />
                    ) : (
                      <LetterPicker variant="sidebar" disabled />
                    )}
                  </StyleCard>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
