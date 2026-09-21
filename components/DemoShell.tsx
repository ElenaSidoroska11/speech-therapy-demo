"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { LetterPractice } from "@/components/letter-practice/LetterPractice";
import { LetterStyleSubNav, LetterPracticeSidebarFooter } from "@/components/letter-practice/LetterStyleSubNav";
import type { LetterStyle } from "@/components/letter-practice/letterStyles";
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
  "grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-[minmax(15rem,0.7fr)_minmax(0,60rem)_minmax(15rem,0.7fr)] md:gap-x-0 md:gap-y-5";

export function DemoShell() {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [letterPracticeMenuOpen, setLetterPracticeMenuOpen] = useState(false);
  const [letterId, setLetterId] = useState<LetterId>("s");
  const [letterPracticeMode, setLetterPracticeMode] = useState<
    "categories" | "exercise"
  >("categories");
  const [letterStyle, setLetterStyle] = useState<LetterStyle | null>(null);

  const selectActivity = (id: string) => {
    if (id === "letters") {
      if (activity === "letters") return;
      setLetterPracticeMenuOpen((open) => !open);
      return;
    }
    setActivity(id as Activity);
  };

  const selectLetterStyle = (style: LetterStyle) => {
    setLetterStyle(style);
    setLetterPracticeMenuOpen(true);
    setLetterPracticeMode("categories");
    setActivity("letters");
  };

  const selectLetter = (id: LetterId) => {
    setLetterId(id);
    setLetterPracticeMode("exercise");
  };

  const goHome = () => {
    setActivity(null);
    setLetterPracticeMenuOpen(false);
    setLetterPracticeMode("categories");
    setLetterStyle(null);
  };

  const sidebarFooter =
    activity === "letters" && letterStyle ? (
      <LetterPracticeSidebarFooter
        activeStyle={letterStyle}
        letterId={letterId}
        showLetterPicker={letterPracticeMode === "exercise"}
        onSelectStyle={selectLetterStyle}
        onSelectLetter={selectLetter}
      />
    ) : letterPracticeMenuOpen ? (
      <LetterStyleSubNav activeStyle={letterStyle} onSelect={selectLetterStyle} />
    ) : null;

  const sidebar = (
    <BrandSidebar
      items={NAV_ITEMS}
      activeId={activity}
      lettersMenuOpen={letterPracticeMenuOpen}
      onSelect={selectActivity}
      onHome={goHome}
      className="md:row-span-2"
      footer={sidebarFooter}
    />
  );

  return (
    <>
      <ActivityNav
        items={NAV_ITEMS}
        activeId={activity}
        lettersMenuOpen={letterPracticeMenuOpen}
        onSelect={selectActivity}
        onHome={goHome}
        footer={sidebarFooter}
      />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        <HomeScene />
        <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col items-center justify-start py-6 sm:py-8 md:py-10">
          <div className={`${PAGE_GRID} w-full items-start md:grid-rows-[auto_auto]`}>
            {sidebar}
            {activity === null ? (
              <HomeLanding />
            ) : activity === "letters" && letterStyle ? (
              <LetterPractice
                letterId={letterId}
                letterStyle={letterStyle}
                mode={letterPracticeMode}
                onLetterChange={setLetterId}
                onModeChange={setLetterPracticeMode}
              />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
