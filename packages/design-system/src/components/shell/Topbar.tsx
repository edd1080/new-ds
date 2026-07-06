import { Icon } from "../../icons/Icon";
import type { Theme } from "../../types/matilda";

export interface TopbarProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onReset: () => void;
  userInitials: string;
  userName: string;
  searchPlaceholder?: string;
  onSearchClick?: () => void;
}

/** .topbar — 60px. Search, theme toggle (sun/moon), reset workspace, avatar. */
export function Topbar({ theme, onThemeChange, onReset, userInitials, userName, searchPlaceholder = "Buscar proyectos, reglas, configuraciones…", onSearchClick }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-search" onClick={onSearchClick} style={{ cursor: onSearchClick ? "pointer" : undefined }}>
        <Icon.search />
        <span className="txt">{searchPlaceholder}</span>
        <span className="spacer" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="topbar-actions">
        <button className="btn ghost sm" onClick={onReset} title="Reiniciar workspace">
          <Icon.refresh /> Reiniciar
        </button>
        <div className="theme-toggle">
          <button className={theme === "light" ? "on" : ""} onClick={() => onThemeChange("light")} title="Modo claro">
            <Icon.sun />
          </button>
          <button className={theme === "dark" ? "on" : ""} onClick={() => onThemeChange("dark")} title="Modo oscuro">
            <Icon.moon />
          </button>
        </div>
        <div className="avatar-sm" title={userName}>
          {userInitials}
        </div>
      </div>
    </header>
  );
}
