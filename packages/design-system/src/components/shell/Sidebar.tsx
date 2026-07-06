"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import type { Theme } from "../../types/matilda";
import type { DtStepperItem } from "../ui/DtStepper";

export interface SidebarNavItem {
  id: string;
  name: string;
  icon: ReactNode;
  hint?: string | null;
}

export interface SidebarNavGroup {
  label?: string;
  items: SidebarNavItem[];
}

export interface ActiveProjectStepper {
  projectName: string;
  steps: DtStepperItem[];
}

export interface SidebarProps {
  navGroups: SidebarNavGroup[];
  activeId: string;
  onNavigate: (id: string) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
  activeProjectStepper?: ActiveProjectStepper | null;
  userName: string;
  userRole: string;
  userInitials: string;
  onOpenSettings: () => void;
  theme: Theme;
  onThemeToggle: () => void;
  onLogout: () => void;
}

/** .sidebar — 268px expanded / 48px collapsed. Nav groups + active-project stepper + user footer. */
export function Sidebar({
  navGroups,
  activeId,
  onNavigate,
  expanded,
  onToggleExpanded,
  activeProjectStepper,
  userName,
  userRole,
  userInitials,
  onOpenSettings,
  theme,
  onThemeToggle,
  onLogout,
}: SidebarProps) {
  const [settingsMenu, setSettingsMenu] = useState(false);

  useEffect(() => {
    if (!settingsMenu) return;
    const fn = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".sidebar-foot")) setSettingsMenu(false);
    };
    document.addEventListener("click", fn, true);
    return () => document.removeEventListener("click", fn, true);
  }, [settingsMenu]);

  return (
    <aside className="sidebar" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
      {navGroups.map((g, gi) => (
        <div className="sidebar-section" key={gi}>
          {g.label && expanded && (
            <div className="sidebar-label">
              <span>{g.label}</span>
            </div>
          )}
          {g.items.map((it) => (
            <div
              key={it.id}
              className={`sidebar-item ${activeId === it.id ? "active" : ""}`}
              onClick={() => onNavigate(it.id)}
              title={!expanded ? it.name : undefined}
              style={!expanded ? { justifyContent: "center" } : {}}
            >
              <span className="ico">{it.icon}</span>
              {expanded && <span>{it.name}</span>}
              {expanded && it.hint && <span className="badge live">{it.hint}</span>}
            </div>
          ))}
        </div>
      ))}

      {activeProjectStepper && expanded && (
        <div className="sidebar-section">
          <div className="sidebar-label">
            <span>Proyecto activo</span>
          </div>
          <div className="dt-project-name">{activeProjectStepper.projectName}</div>
          <div className="dt-stepper">
            {activeProjectStepper.steps.map((step, i) => (
              <div key={i} className={`dt-step ${step.state}`} onClick={step.state !== "locked" ? step.onClick : undefined}>
                <div className="dt-step-line" />
                <div className="dt-step-node">{step.state === "done" ? "✓" : i + 1}</div>
                <div className="dt-step-label">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ flex: 1 }} />

      <div className="sidebar-section" style={{ paddingBottom: 0 }}>
        <div
          className="sidebar-item"
          onClick={onToggleExpanded}
          title={expanded ? "Colapsar sidebar" : "Expandir sidebar"}
          style={!expanded ? { justifyContent: "center" } : {}}
        >
          <span className="ico" style={{ opacity: 0.6 }}>
            {expanded ? <Icon.chevronLeft /> : <Icon.chevronRight />}
          </span>
          {expanded && <span style={{ fontSize: 12, color: "var(--ink-4)" }}>Colapsar</span>}
        </div>
      </div>

      <div
        className="sidebar-foot"
        style={{ position: "relative", cursor: expanded ? "pointer" : "default" }}
        onClick={() => expanded && setSettingsMenu((m) => !m)}
        title={!expanded ? userName : undefined}
      >
        <div className="avatar">{userInitials}</div>
        {expanded && (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="nm">{userName}</div>
              <div className="sb">{userRole}</div>
            </div>
            <span style={{ color: "var(--ink-4)", flexShrink: 0 }}>
              <Icon.cog />
            </span>
          </>
        )}
        {settingsMenu && expanded && (
          <div className="sb-settings-menu" onClick={(e) => e.stopPropagation()}>
            <div
              className="sb-settings-item"
              onClick={() => {
                onOpenSettings();
                setSettingsMenu(false);
              }}
            >
              <Icon.cog /> Ajustes
            </div>
            <div className="sb-settings-sep" />
            <div
              className="sb-settings-item"
              onClick={() => {
                onThemeToggle();
                setSettingsMenu(false);
              }}
            >
              {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </div>
            <div className="sb-settings-sep" />
            <div
              className="sb-settings-item"
              style={{ color: "var(--err)" }}
              onClick={() => {
                onLogout();
                setSettingsMenu(false);
              }}
            >
              <Icon.logout /> Reiniciar sesión
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
