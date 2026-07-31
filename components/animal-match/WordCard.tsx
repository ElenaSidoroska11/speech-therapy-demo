"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import type { Animal } from "./animals";

type WordCardProps = {
  animal: Animal;
  disabled?: boolean;
};

export function WordCard({ animal, disabled }: WordCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: animal.id,
      disabled,
      data: { animal },
    });

  return (
    <motion.button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      whileHover={disabled ? undefined : { scale: 1.06, y: -4 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      animate={{
        scale: isDragging ? 1.08 : 1,
        boxShadow: isDragging
          ? "0 18px 40px rgba(15, 118, 110, 0.28)"
          : "0 8px 0 rgba(15, 118, 110, 0.18)",
      }}
      className={`select-none rounded-2xl border-4 px-6 py-3 text-2xl font-extrabold capitalize tracking-wide text-teal-900 outline-none sm:text-3xl ${
        isDragging ? "z-50 cursor-grabbing opacity-90" : "cursor-grab"
      } ${disabled ? "pointer-events-none opacity-40" : ""}`}
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: "none",
        backgroundColor: animal.softColor,
        borderColor: animal.borderColor,
      }}
      aria-label={`Drag word ${animal.word}`}
    >
      {animal.word}
    </motion.button>
  );
}

type WordSlotProps = {
  animal: Animal;
};

export function WordSlotGhost({ animal }: WordSlotProps) {
  return (
    <div
      className="rounded-2xl border-4 border-dashed border-teal-200/80 bg-white/40 px-6 py-3 text-2xl font-extrabold capitalize tracking-wide text-transparent sm:text-3xl"
      aria-hidden
    >
      {animal.word}
    </div>
  );
}
