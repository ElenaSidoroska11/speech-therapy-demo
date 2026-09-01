"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClinicLogo } from "@/components/ActivityNav";
import { HomeScene } from "@/components/home/HomeScene";

/* function LetterBuddy({
  src,
  alt,
  className,
  delay = 0,
  rotate = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ opacity: 0, scale: 0.78, rotate }}
      animate={{ opacity: 1, scale: 1, rotate, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 3.8 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(15,118,110,0.28)]"
      />
    </motion.div>
  );
} */

function HeroPhoto() {
  return (
    <div className={CENTER_CONTENT_WIDTH}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="relative z-10 rounded-3xl bg-[#FDA702] p-2 shadow-[0_28px_60px_rgba(253,167,2,0.7),0_12px_28px_rgba(253,167,2,0.5),0_4px_10px_rgba(180,100,0,0.35)] sm:rounded-4xl sm:p-3 md:rounded-[2.5rem] md:p-4 md:shadow-[0_36px_80px_rgba(253,167,2,0.75),0_16px_36px_rgba(253,167,2,0.55),0_6px_14px_rgba(180,100,0,0.4)]">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[1.75rem]">
          <Image
            src="/kids.png"
            alt="Kids learning together"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 768px"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_6px_28px_rgba(253,167,2,0.55)]"
          />
        </div>
      </motion.div>
    </div>
  );
}

export { HomeScene };

export const CENTER_TITLE_SLOT =
  "relative z-20 max-w-xl justify-self-center px-4 text-center sm:max-w-2xl sm:px-6 md:col-start-2 md:row-start-1 md:max-w-none";

export const CENTER_BODY_SLOT =
  "relative flex flex-col items-center justify-center gap-4 px-4 sm:gap-5 sm:px-6 md:col-start-2 md:row-start-2 md:px-2";

export const CENTER_CONTENT_WIDTH = "relative w-full max-w-md sm:max-w-xl md:max-w-none";

/** Matches the home title block height so the page grid stays aligned. */
export function HomeTitleHeightSpacer() {
  return (
    <div aria-hidden className="pointer-events-none invisible">
      <h1 className="truncate font-(family-name:--font-display) text-xl font-bold leading-tight tracking-tight sm:text-3xl md:text-5xl">
        &apos;Literacy Made Easy&apos; Digital Program
      </h1>
      <p className="mt-2 font-(family-name:--font-display) text-2xl font-extrabold tracking-wide sm:mt-3 sm:text-4xl md:text-5xl">
        LETTER SOUNDS
      </p>
    </div>
  );
}

export function HomeLanding() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={CENTER_TITLE_SLOT}>
        <h1 className="truncate font-(family-name:--font-display) text-xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_3px_0_rgba(15,118,110,0.25)] sm:text-3xl md:text-5xl">
          &apos;Literacy Made Easy&apos; Digital Program
        </h1>
        <p className="mt-2 font-(family-name:--font-display) text-2xl font-extrabold tracking-wide text-[#e52328] drop-shadow-[0_2px_0_rgba(15,118,110,0.25)] sm:mt-3 sm:text-4xl md:text-5xl">
          LETTER SOUNDS
        </p>
      </motion.div>

      <div className={CENTER_BODY_SLOT}>
        <ClinicLogo
          priority
          className="h-auto w-[min(22rem,88vw)] object-contain md:hidden"
        />
        <HeroPhoto />
      </div>
    </>
  );
}
