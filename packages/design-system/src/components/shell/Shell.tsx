"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { BrandCell } from "./BrandCell";
import { Topbar } from "./Topbar";
import { Sidebar, type SidebarNavGroup, type ActiveProjectStepper } from "./Sidebar";
import { Statusbar } from "./Statusbar";
import type { Theme } from "../../types/matilda";

export interface ShellProps {
  activeId: string;
  navGroups: SidebarNavGroup[];
  onNavigate: (id: string) => void;
  activeProjectStepper?: ActiveProjectStepper | null;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onReset: () => void;
  onOpenSettings: () => void;
  userName: string;
  userRole: string;
  userInitials: string;
  tenant: string;
  mapperId?: string | null;
  version?: string;
  children: ReactNode;
}

/**
 * .shell — grid 268px|1fr / 60px|1fr|34px. Sidebar collapses to 48px below 1100px viewport
 * or via the collapse toggle (persisted on <html data-sidebar>). Dimensions are fixed —
 * see cursor_handoff/AGENTS.md §6 "El Shell NO se modifica".
 */
export function Shell({
  activeId,
  navGroups,
  onNavigate,
  activeProjectStepper,
  theme,
  onThemeChange,
  onReset,
  onOpenSettings,
  userName,
  userRole,
  userInitials,
  tenant,
  mapperId,
  version,
  children,
}: ShellProps) {
  const [sbOpen, setSbOpen] = useState(() => (typeof window !== "undefined" ? window.innerWidth >= 1100 : true));

  useLayoutEffect(() => {
    document.documentElement.dataset.sidebar = sbOpen ? "open" : "closed";
  }, [sbOpen]);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth < 1100) setSbOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div className="shell">
      <BrandCell expanded={sbOpen} version={version} />
      <Topbar theme={theme} onThemeChange={onThemeChange} onReset={onReset} userInitials={userInitials} userName={userName} />
      <Sidebar
        navGroups={navGroups}
        activeId={activeId}
        onNavigate={onNavigate}
        expanded={sbOpen}
        onToggleExpanded={() => setSbOpen((o) => !o)}
        activeProjectStepper={activeProjectStepper}
        userName={userName}
        userRole={userRole}
        userInitials={userInitials}
        onOpenSettings={onOpenSettings}
        theme={theme}
        onThemeToggle={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        onLogout={onReset}
      />
      <main className="main" key={activeId}>
        <div className="main-scroll">{children}</div>
      </main>
      <Statusbar tenant={tenant} mapperId={mapperId} />
    </div>
  );
}
