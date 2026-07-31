import { AnimalMatchGame } from "@/components/animal-match/AnimalMatchGame";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#9FE7FF_0%,#B8F3E0_42%,#7ED6A0_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0 2px, transparent 3px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.4) 0 2px, transparent 3px)",
          backgroundSize: "48px 48px",
        }}
      />

      <span
        aria-hidden
        className="cloud pointer-events-none absolute left-[8%] top-10 text-5xl opacity-80 sm:text-6xl"
      >
        ☁️
      </span>
      <span
        aria-hidden
        className="cloud-slow pointer-events-none absolute right-[12%] top-24 text-4xl opacity-70 sm:text-5xl"
      >
        ☁️
      </span>
      {/* <span
        aria-hidden
        className="pointer-events-none absolute right-[22%] top-8 text-4xl drop-shadow-sm"
        style={{ filter: "drop-shadow(0 0 12px rgba(255,229,102,0.8))" }}
      >
        ☀️
      </span> */}

      <main className="relative z-10 flex flex-1 flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
        <AnimalMatchGame />
      </main>

      <footer className="relative z-10 pb-6 text-center text-sm font-semibold text-teal-900/60">
        Built for speech therapy demos · tap, drag, listen & match
      </footer>
    </div>
  );
}
