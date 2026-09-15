"use client";

import { motion } from "framer-motion";

export function Sun() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-10 top-2 z-30 sm:right-16 sm:top-4 md:right-24 md:top-5"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="relative h-48 w-48 drop-shadow-[0_0_20px_rgba(255,213,74,0.55)] sm:h-64 sm:w-64 md:h-96 md:w-96 md:drop-shadow-[0_0_32px_rgba(255,213,74,0.65)]">
        <motion.svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x="56"
              y="4"
              width="8"
              height="18"
              rx="4"
              fill="#FFE566"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
        </motion.svg>
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
          <circle cx="60" cy="60" r="28" fill="#FFD54A" />
          <circle cx="60" cy="60" r="22" fill="#FFE566" />
          <circle cx="52" cy="56" r="3.2" fill="#0F766E" />
          <circle cx="68" cy="56" r="3.2" fill="#0F766E" />
          <path
            d="M 50 66 Q 60 76 70 66"
            fill="none"
            stroke="#0F766E"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
