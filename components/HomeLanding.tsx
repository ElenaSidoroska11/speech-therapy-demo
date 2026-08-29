"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClinicLogo } from "@/components/ActivityNav";

function Sun() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-10 top-2 z-30 sm:right-16 sm:top-4 md:right-24 md:top-5"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="relative h-32 w-32 drop-shadow-[0_0_20px_rgba(255,213,74,0.55)] sm:h-44 sm:w-44 md:h-64 md:w-64 md:drop-shadow-[0_0_28px_rgba(255,213,74,0.65)]">
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

function Flower({
  petal,
  center,
  delay = 0,
  className,
}: {
  petal: string;
  center: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 76"
      aria-hidden
      className={className}
      style={{ originX: 0.5, originY: 1 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, rotate: [-5, 5, -5] }}
      transition={{
        opacity: { duration: 0.45, delay },
        y: { duration: 0.45, delay },
        rotate: {
          duration: 3.4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <path
        d="M20 30 L20 74"
        fill="none"
        stroke="#3F9E62"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="12"
        cy="54"
        rx="8"
        ry="3.6"
        fill="#5FBF7E"
        transform="rotate(-32 12 54)"
      />
      <ellipse
        cx="28"
        cy="61"
        rx="8"
        ry="3.6"
        fill="#4CAF70"
        transform="rotate(30 28 61)"
      />
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="11"
          rx="5.4"
          ry="10"
          fill={petal}
          transform={`rotate(${i * 60} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="6.2" fill={center} />
      <circle cx="18.5" cy="18.6" r="1.6" fill="#fff" opacity="0.55" />
    </motion.svg>
  );
}

function Grass() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(180deg,transparent_0%,#7ED6A0_55%,#5FBF7E_100%)] sm:h-16 md:h-20" />
      <div className="absolute inset-x-0 bottom-10 h-5 bg-[radial-gradient(ellipse_at_center,#86EFAC_0%,transparent_70%)] opacity-80 sm:bottom-14 sm:h-6 md:bottom-18" />

      <Flower
        petal="#e52328"
        center="#FFE566"
        delay={0.12}
        className="absolute bottom-1 left-[3%] h-20 w-11 sm:h-24 sm:w-14 md:h-28 md:w-16"
      />
      <Flower
        petal="#FFF6B8"
        center="#FDA702"
        delay={0.28}
        className="absolute bottom-0 left-[11%] h-14 w-8 sm:h-16 sm:w-9 md:h-20 md:w-11"
      />
      <Flower
        petal="#FDA702"
        center="#FFE566"
        delay={0.18}
        className="absolute bottom-2 left-[19%] hidden h-24 w-14 sm:block md:h-28 md:w-16"
      />
      <Flower
        petal="#F472B6"
        center="#FFD54A"
        delay={0.34}
        className="absolute bottom-0 left-[31%] h-16 w-9 sm:left-[34%] sm:h-20 sm:w-11"
      />
      <Flower
        petal="#FFFFFF"
        center="#FDA702"
        delay={0.22}
        className="absolute bottom-1 left-[46%] h-16 w-9 sm:h-20 sm:w-11 md:left-[48%] md:h-24 md:w-14"
      />
      <Flower
        petal="#e52328"
        center="#FFE566"
        delay={0.4}
        className="absolute bottom-2 left-[61%] h-20 w-11 sm:h-24 sm:w-14 md:left-[63%] md:h-28 md:w-16"
      />
      <Flower
        petal="#C4B5FD"
        center="#FFE566"
        delay={0.16}
        className="absolute bottom-0 left-[74%] hidden h-16 w-9 sm:block md:h-24 md:w-14"
      />
      <Flower
        petal="#FFE566"
        center="#F59E0B"
        delay={0.3}
        className="absolute bottom-2 left-[84%] h-20 w-11 sm:h-24 sm:w-14 md:left-[86%] md:h-28 md:w-16"
      />
      <Flower
        petal="#FDA702"
        center="#FFF6B8"
        delay={0.24}
        className="absolute bottom-0 left-[93%] h-14 w-8 sm:h-16 sm:w-9 md:h-20 md:w-11"
      />
    </div>
  );
}

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

export function HomeScene() {
  return (
    <>
      <Grass />
      <Sun />
    </>
  );
}

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
