"use client";

import { motion } from "framer-motion";
import { LetterPicker } from "./LetterPicker";
import { LETTER_STYLES, type LetterStyle } from "./letterStyles";
import type { LetterId } from "./letters";
import {
  AVAILABLE_PRINT_LETTERS,
  getPrintLetter,
  isSelectablePrintLetter,
} from "./letters-print";

type LetterStyleButtonProps = {
  label: string;
  active: boolean;
  onSelect: () => void;
};

export function LetterStyleButton({ label, active, onSelect }: LetterStyleButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, x: 2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      className={`w-full rounded-2xl px-4 py-2.5 text-center text-base font-extrabold shadow-lg ring-2 ring-white/70 backdrop-blur-md transition md:rounded-3xl md:px-6 md:py-4 md:text-xl ${
        active
          ? "bg-[#e52328] text-white  shadow-[0_6px_0_#B91C1C] hover:shadow-none"
          : "bg-[#FDA702] text-white shadow-[0_6px_0_#0F766E] hover:bg-[#e52328] hover:shadow-none"
      }`}>
      {label}
    </motion.button>
  );
}

type LetterStyleSubNavProps = {
  activeStyle: LetterStyle | null;
  onSelect: (style: LetterStyle) => void;
  className?: string;
};

export function LetterStyleSubNav({
  activeStyle,
  onSelect,
  className = "",
}: LetterStyleSubNavProps) {
  return (
    <nav aria-label="Letter styles" className={`flex w-full flex-col gap-2 md:gap-5 ${className}`}>
      {LETTER_STYLES.map((style) => (
        <LetterStyleButton
          key={style.id}
          label={style.label}
          active={activeStyle === style.id}
          onSelect={() => onSelect(style.id)}
        />
      ))}
    </nav>
  );
}

type LetterPracticeSidebarFooterProps = {
  activeStyle: LetterStyle;
  letterId: LetterId;
  showLetterPicker?: boolean;
  onSelectStyle: (style: LetterStyle) => void;
  onSelectLetter: (id: LetterId) => void;
  className?: string;
};

/** Active style, letters (when in exercise), then the other style — used while letter practice is open. */
export function LetterPracticeSidebarFooter({
  activeStyle,
  letterId,
  showLetterPicker = false,
  onSelectStyle,
  onSelectLetter,
  className = "",
}: LetterPracticeSidebarFooterProps) {
  const active = LETTER_STYLES.find((style) => style.id === activeStyle);
  const inactive = LETTER_STYLES.find((style) => style.id !== activeStyle);

  if (!active || !inactive) return null;

  return (
    <nav
      aria-label="Letter practice"
      className={`flex w-full flex-col gap-2 md:gap-5 ${className}`}>
      <LetterStyleButton
        label={active.label}
        active
        onSelect={() => onSelectStyle(active.id)}
      />
      {showLetterPicker ? (
        activeStyle === "victorian" ? (
          <LetterPicker
            variant="sidebar"
            letterId={letterId}
            display="glyph"
            onSelect={onSelectLetter}
          />
        ) : (
          <LetterPicker
            variant="sidebar"
            letterId={letterId}
            display="glyph"
            letters={AVAILABLE_PRINT_LETTERS}
            resolveLetter={getPrintLetter}
            isLetterSelectable={isSelectablePrintLetter}
            onSelect={onSelectLetter}
          />
        )
      ) : null}
      <LetterStyleButton
        label={inactive.label}
        active={false}
        onSelect={() => onSelectStyle(inactive.id)}
      />
    </nav>
  );
}
