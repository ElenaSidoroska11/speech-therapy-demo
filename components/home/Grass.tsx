"use client";

import { Flower } from "@/components/home/Flower";

export function Grass() {
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
