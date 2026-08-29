"use client";

import { motion } from "framer-motion";

const PIECES = [
  "⭐",
  "✨",
  "🎉",
  "💛",
  "🌟",
  "🎈",
  "💚",
  "🧡",
  "🎊",
  "☀️",
  "🐾",
  "🌈",
];

export function CelebrationBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 8) * 0.08;
        const duration = 1.4 + (i % 5) * 0.15;
        const emoji = PIECES[i % PIECES.length];

        return (
          <motion.span
            key={i}
            className="absolute text-2xl sm:text-3xl"
            style={{ left: `${left}%`, top: "40%" }}
            initial={{ opacity: 0, y: 0, scale: 0.4, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-20, -120 - (i % 6) * 30],
              x: [(i % 2 === 0 ? 1 : -1) * ((i % 5) * 18)],
              scale: [0.4, 1.2, 1],
              rotate: [(i % 2 === 0 ? 1 : -1) * 180],
            }}
            transition={{ duration, delay, ease: "easeOut" }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}
