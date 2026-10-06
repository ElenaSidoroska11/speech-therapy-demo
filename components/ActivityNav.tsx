"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ClinicLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Melbourne Literacy & Learning Clinic"
      width={1881}
      height={831}
      priority={priority}
      className={className}
    />
  );
}

export type ActivityNavItem = {
  id: string;
  label: string;
  short: string;
  icon: LucideIcon;
};

function NavButton({
  item,
  active,
  onSelect,
  expanded = true,
  size = "md",
}: {
  item: ActivityNavItem;
  active?: boolean;
  onSelect: () => void;
  expanded?: boolean;
  size?: "md" | "lg";
}) {
  const Icon = item.icon;
  const large = size === "lg";
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04, x: expanded ? 2 : 0 }}
      whileTap={{ scale: 0.96 }}
      onClick={onSelect}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      title={item.label}
      className={`inline-flex items-center font-extrabold shadow-lg backdrop-blur-md transition ${
        active
          ? "bg-[#e52328] text-white shadow-[0_6px_0_#B91C1C] ring-2 ring-white/70 hover:shadow-none"
          : "bg-[#FDA702] text-white shadow-[0_6px_0_#0F766E] ring-2 ring-white/70 hover:bg-[#e52328] hover:shadow-none"
      } ${
        expanded
          ? large
            ? "w-full justify-start gap-3 rounded-3xl px-6 py-4 text-left text-xl"
            : "w-full justify-start gap-2 rounded-2xl px-4 py-2.5 text-left text-base"
          : "h-11 w-11 justify-center gap-2 rounded-2xl p-0 text-sm"
      }`}>
      <Icon className={large ? "h-7 w-7 shrink-0" : "h-5 w-5 shrink-0"} />
      {expanded ? <span>{item.label}</span> : null}
    </motion.button>
  );
}

const HOME_ITEM: ActivityNavItem = {
  id: "home",
  label: "Home",
  short: "Home",
  icon: Home,
};

function NavLinks({
  items,
  activeId,
  lettersMenuOpen = false,
  onSelect,
  onHome,
  onPick,
  size = "md",
}: {
  items: ActivityNavItem[];
  activeId: string | null;
  lettersMenuOpen?: boolean;
  onSelect: (id: string) => void;
  onHome: () => void;
  onPick?: () => void;
  size?: "md" | "lg";
}) {
  const homeActive = activeId === null && !lettersMenuOpen;

  return (
    <>
      <NavButton
        item={HOME_ITEM}
        active={homeActive}
        expanded
        size={size}
        onSelect={() => {
          onPick?.();
          onHome();
        }}
      />
      {items.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          active={
            item.id === "letters"
              ? lettersMenuOpen || activeId === item.id
              : activeId === item.id
          }
          expanded
          size={size}
          onSelect={() => {
            // Keep the mobile menu open for Letter Practice so style/letter
            // options in the footer can be chosen without reopening.
            if (item.id !== "letters") {
              onPick?.();
            }
            onSelect(item.id);
          }}
        />
      ))}
    </>
  );
}

export function ActivityDesktopNav({
  items,
  activeId,
  lettersMenuOpen,
  onSelect,
  onHome,
  className,
  size = "md",
}: {
  items: ActivityNavItem[];
  activeId: string | null;
  lettersMenuOpen?: boolean;
  onSelect: (id: string) => void;
  onHome: () => void;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <nav aria-label="Therapy activities" className={className}>
      <NavLinks
        items={items}
        activeId={activeId}
        lettersMenuOpen={lettersMenuOpen}
        onSelect={onSelect}
        onHome={onHome}
        size={size}
      />
    </nav>
  );
}

export function BrandSidebar({
  items,
  activeId,
  lettersMenuOpen,
  onSelect,
  onHome,
  className = "",
  footer,
}: {
  items: ActivityNavItem[];
  activeId: string | null;
  lettersMenuOpen?: boolean;
  onSelect: (id: string) => void;
  onHome: () => void;
  className?: string;
  footer?: ReactNode;
}) {
  return (
    <div
      className={`hidden min-h-0 self-start md:col-start-1 md:row-start-1 md:mt-5 md:flex md:flex-col md:items-center ${className}`}>
      <ClinicLogo
        priority
        className="mb-3 h-auto w-56 -translate-y-4 object-contain md:w-64 md:-translate-y-6"
      />
      <div className="-mt-2 flex w-max flex-col gap-5">
        <ActivityDesktopNav
          items={items}
          activeId={activeId}
          lettersMenuOpen={lettersMenuOpen}
          onSelect={onSelect}
          onHome={onHome}
          size="lg"
          className="flex w-full flex-col gap-5"
        />
        {footer}
      </div>
    </div>
  );
}

export function ActivityNav({
  items,
  activeId,
  lettersMenuOpen,
  onSelect,
  onHome,
  footer,
}: {
  items: ActivityNavItem[];
  activeId: string | null;
  lettersMenuOpen?: boolean;
  onSelect: (id: string) => void;
  onHome: () => void;
  footer?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed left-2 top-2 z-50 md:hidden">
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-teal-800 shadow-lg ring-2 ring-white/60 backdrop-blur-md hover:bg-[#FDA702] hover:text-white">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Dismiss menu"
              className="fixed inset-0 z-40 bg-teal-950/25 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id={menuId}
              aria-label="Therapy activities"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 top-14 z-50 flex w-56 flex-col gap-2 rounded-3xl border-2 border-white/70 bg-white/85 p-3 shadow-[0_18px_40px_rgba(13,148,136,0.28)] backdrop-blur-md">
              <NavLinks
                items={items}
                activeId={activeId}
                lettersMenuOpen={lettersMenuOpen}
                onSelect={onSelect}
                onHome={onHome}
                onPick={() => setOpen(false)}
              />
              {footer ? (
                <div
                  className="mt-1 border-t border-white/50 pt-2"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("button")) {
                      setOpen(false);
                    }
                  }}>
                  {footer}
                </div>
              ) : null}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
