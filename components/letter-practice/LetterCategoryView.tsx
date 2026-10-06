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

function StyleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-3xl rounded-4xl bg-[#8ED1EB] p-3 pt-3.5 shadow-[0_10px_0_rgba(15,118,110,0.12)] ring-2 ring-[#BCE8F7] backdrop-blur-sm sm:max-w-4xl sm:p-4 sm:pt-4">
      <h2 className="mb-2.5 text-center font-(family-name:--font-display) text-xl font-extrabold tracking-wide text-[#e52328] drop-shadow-[0_2px_0_rgba(15,118,110,0.25)] sm:mb-3 sm:text-2xl md:text-3xl">
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
      <div className={`${CENTER_TITLE_SLOT} relative flex flex-col items-center gap-3 md:justify-center`}>
        <div className="hidden md:block">
          <HomeTitleHeightSpacer />
        </div>
        <div className="relative z-20 flex w-full flex-col items-center gap-3 px-1 md:absolute md:inset-x-4 md:inset-y-0 md:justify-center md:gap-4 md:px-0 lg:inset-x-6">
          <header className="shrink-0 text-center">
            <p className="max-w-lg font-(family-name:--font-display) text-base font-bold leading-snug tracking-tight text-[#e52328] sm:mt-3 sm:max-w-2xl sm:text-3xl sm:leading-tight md:max-w-3xl md:text-4xl">
              {style
                ? "Choose a letter to start practicing"
                : "Choose a letter style and letter to practice."}
            </p>
            <p className="mt-1.5 max-w-lg font-(family-name:--font-display) text-sm font-bold leading-relaxed tracking-normal text-[#FDA702] sm:mt-3 sm:max-w-2xl sm:text-2xl md:max-w-3xl md:text-3xl">
              Watch how the letter is written, then trace it with your finger, stylus or mouse.
            </p>
          </header>
        </div>
      </div>

      <div className={CENTER_BODY_SLOT}>
        <div className={`${CENTER_CONTENT_WIDTH} max-w-3xl sm:max-w-4xl md:max-w-4xl`}>
          <div className="mt-3 flex w-full items-start sm:mt-4 md:mt-8">
            {style && styleLabel ? (
              <StyleCard title={styleLabel}>
                {style === "victorian" ? (
                  <LetterPicker variant="panel" display="glyph" onSelect={onSelectLetter} />
                ) : (
                  <LetterPicker variant="panel" disabled />
                )}
              </StyleCard>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
