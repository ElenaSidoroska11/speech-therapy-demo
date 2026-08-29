import { DemoShell } from "@/components/DemoShell";

export default function Home() {
  return (
    <div className="relative flex h-full min-h-full flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#7DD3FC_0%,#38BDF8_35%,#0EA5E9_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35)_0%,transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.65) 0 2px, transparent 3px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.45) 0 2px, transparent 3px)",
          backgroundSize: "48px 48px",
        }}
      />

      <DemoShell />
    </div>
  );
}
