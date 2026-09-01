"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { LetterPractice } from "@/components/letter-practice/LetterPractice";
import { LetterPicker } from "@/components/letter-practice/LetterPicker";
import type { LetterId } from "@/components/letter-practice/letters";
import { HomeLanding, HomeScene } from "@/components/HomeLanding";
import { ActivityNav, BrandSidebar } from "@/components/ActivityNav";

type Activity = "letters";

const NAV_ITEMS: {
  id: Activity;
  label: string;
  short: string;
  icon: typeof Mic;
}[] = [
  { id: "letters", label: "Letter Practice", short: "Letters", icon: Mic },
];

const PAGE_GRID =
  "grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-[minmax(16rem,1fr)_minmax(0,48rem)_minmax(12.5rem,1fr)] md:gap-x-0 md:gap-y-5";

export function DemoShell() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [letterId, setLetterId] = useState<LetterId>("s");

  const selectActivity = (id: string) => setActivity(id as Activity);
  const goHome = () => setActivity(null);

  const sidebar = (
    <BrandSidebar
      items={NAV_ITEMS}
      activeId={activity}
      onSelect={selectActivity}
      onHome={goHome}
      className="md:row-span-2"
      footer={
        activity === "letters" ? (
          <LetterPicker variant="sidebar" letterId={letterId} onSelect={setLetterId} />
        ) : undefined
      }
    />
  );

  return (
    <>
      <ActivityNav
        items={NAV_ITEMS}
        activeId={activity}
        onSelect={selectActivity}
        onHome={goHome}
      />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        <HomeScene />
        <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col items-center justify-center py-8 -translate-y-4 sm:py-10 sm:-translate-y-8 md:py-12 md:-translate-y-14">
          <div className={`${PAGE_GRID} items-start md:grid-rows-[auto_auto]`}>
            {sidebar}
            {activity === null ? (
              <HomeLanding />
            ) : activity === "letters" ? (
              <LetterPractice letterId={letterId} onLetterChange={setLetterId} />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
