"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { playYayy } from "@/components/shared/sounds";

const PIECES = ["⭐", "✨", "🎉", "💛", "🌟", "🎈", "❤️", "❤️", "🎊", "☀️"];

const BURST_COUNT = 24;

function getBurstPieceLayout(index: number) {
  const left = 4 + ((index * 41 + 11) % 92);
  const top = 6 + ((index * 37 + 9) % 88);
  const xDrift = (index % 2 === 0 ? 1 : -1) * (28 + (index % 7) * 24);
  const ySign = index % 3 === 0 ? 1 : -1;
  const yDrift = ySign * (36 + (index % 8) * 34);
  const rotate = (index % 2 === 0 ? 1 : -1) * (18 + (index % 5) * 14);

  return { left, top, xDrift, yDrift, rotate };
}

const BURST_DURATION = 2.8;
const BURST_DELAY = 0;

const burstMotion = {
  opacity: [0, 1, 1, 0] as number[],
  y: [-20, -140] as number[],
  scale: [0.5, 1.5, 1.25] as number[],
};

const burstTransition = {
  duration: BURST_DURATION,
  delay: BURST_DELAY,
  ease: "easeOut" as const,
  repeat: 0,
};

export function CelebrationBurst() {
  useEffect(() => {
    playYayy();
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: BURST_COUNT }).map((_, i) => {
          const { left, top, xDrift, yDrift, rotate } = getBurstPieceLayout(i);
          const emoji = PIECES[i % PIECES.length];

          return (
            <motion.span
              key={i}
              className="absolute text-4xl sm:text-5xl md:text-6xl"
              style={{ left: `${left}%`, top: `${top}%` }}
              initial={{ opacity: 0, y: 0, scale: 0.5, rotate: 0 }}
              animate={{
                opacity: burstMotion.opacity,
                scale: burstMotion.scale,
                x: [0, xDrift],
                y: [0, yDrift],
                rotate: [0, rotate, 0],
              }}
              transition={burstTransition}>
              {emoji}
            </motion.span>
          );
        })}
      </div>

      <motion.div
        className="pointer-events-none absolute z-20 -translate-x-1/2"
        style={{ left: "50%", top: "40%" }}
        initial={{ opacity: 0, y: 0, scale: 0.5, rotate: 0 }}
        animate={burstMotion}
        transition={burstTransition}>
        <Image
          src="/kids-yay.png"
          alt=""
          width={384}
          height={256}
          aria-hidden
          className="h-auto w-40 object-contain drop-shadow-[0_12px_24px_rgba(15,118,110,0.25)] sm:w-52 md:w-64"
        />
      </motion.div>
    </>
  );
}
