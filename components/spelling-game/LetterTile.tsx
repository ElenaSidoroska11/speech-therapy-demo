"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import type { LetterTile as LetterTileData } from "./words";

type LetterTileProps = {
  tile: LetterTileData;
  softColor: string;
  borderColor: string;
  disabled?: boolean;
};

export function LetterTile({
  tile,
  softColor,
  borderColor,
  disabled,
}: LetterTileProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: tile.id,
      disabled,
      data: { tile },
    });

  return (
    <motion.button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      whileHover={disabled ? undefined : { scale: 1.08, y: -4 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      animate={{
        scale: isDragging ? 1.1 : 1,
        boxShadow: isDragging
          ? "0 16px 32px rgba(15, 118, 110, 0.28)"
          : "0 6px 0 rgba(15, 118, 110, 0.16)",
      }}
      className={`flex h-14 w-14 select-none items-center justify-center rounded-2xl border-4 text-2xl font-extrabold text-teal-900 outline-none sm:h-16 sm:w-16 sm:text-3xl ${
        isDragging ? "z-50 cursor-grabbing opacity-90" : "cursor-grab"
      } ${disabled ? "pointer-events-none opacity-40" : ""}`}
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        backgroundColor: softColor,
        borderColor,
      }}
      aria-label={`Drag letter ${tile.letter}`}
    >
      {tile.letter}
    </motion.button>
  );
}

export function LetterTileGhost({ letter }: { letter: string }) {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-dashed border-teal-200/80 bg-white/40 text-2xl font-extrabold text-transparent sm:h-16 sm:w-16 sm:text-3xl"
      aria-hidden
    >
      {letter}
    </div>
  );
}

type OverlayLetterProps = {
  letter: string;
  softColor: string;
  borderColor: string;
};

export function OverlayLetter({
  letter,
  softColor,
  borderColor,
}: OverlayLetterProps) {
  return (
    <div
      className="flex h-14 w-14 cursor-grabbing items-center justify-center rounded-2xl border-4 text-2xl font-extrabold text-teal-900 shadow-2xl sm:h-16 sm:w-16 sm:text-3xl"
      style={{ backgroundColor: softColor, borderColor }}
    >
      {letter}
    </div>
  );
}
