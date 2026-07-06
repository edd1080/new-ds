/**
 * Bowpi Enterprise — Icon library.
 * Ported from project/primitives.jsx. Stroke-based, 1.5px, fill:none.
 * NO external icon library (Lucide, Heroicons, etc.) — see cursor_handoff/AGENTS.md §4.
 * To add a new icon: design it first, then add it here.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
  stroke: "currentColor",
};

export const Icon = {
  flow: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="3" cy="3" r="1.6" />
      <circle cx="11" cy="3" r="1.6" />
      <circle cx="3" cy="11" r="1.6" />
      <circle cx="11" cy="11" r="1.6" />
      <path d="M4.5 3h5M3 4.5v5M11 4.5v5M4.5 11h5" />
    </svg>
  ),
  layers: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 1l5.5 3L7 7 1.5 4 7 1z" />
      <path d="M1.5 7L7 10l5.5-3M1.5 10L7 13l5.5-3" />
    </svg>
  ),
  data: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <ellipse cx="7" cy="3" rx="5" ry="1.6" />
      <path d="M2 3v8c0 .88 2.24 1.6 5 1.6s5-.72 5-1.6V3" />
      <path d="M2 7c0 .88 2.24 1.6 5 1.6s5-.72 5-1.6" />
    </svg>
  ),
  decision: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 1l6 6-6 6-6-6 6-6z" />
      <path d="M5 7h4M7 5v4" />
    </svg>
  ),
  bolt: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7.5 1L3 8h3.5L6 13l4.5-7H7L7.5 1z" />
    </svg>
  ),
  search: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="6" cy="6" r="4.5" />
      <path d="M12.5 12.5l-3-3" />
    </svg>
  ),
  bell: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M3 11h8M4 11V7a3 3 0 016 0v4M6 13h2" />
    </svg>
  ),
  user: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="7" cy="5" r="2.5" />
      <path d="M2.5 12c.5-2 2.5-3.5 4.5-3.5s4 1.5 4.5 3.5" />
    </svg>
  ),
  cog: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="7" cy="7" r="2" />
      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3 3l1.5 1.5M9.5 9.5L11 11M3 11l1.5-1.5M9.5 4.5L11 3" />
    </svg>
  ),
  chevron: (p: IconProps = {}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" {...stroke} {...p}>
      <path d="M3 1l4 4-4 4" />
    </svg>
  ),
  chevronDown: (p: IconProps = {}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" {...stroke} {...p}>
      <path d="M2 4l3 3 3-3" />
    </svg>
  ),
  chevronLeft: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M9 3L5 7l4 4" />
    </svg>
  ),
  chevronRight: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5 3l4 4-4 4" />
    </svg>
  ),
  upload: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 2v8M3.5 5.5L7 2l3.5 3.5M2 12h10" />
    </svg>
  ),
  api: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <rect x="1.5" y="3" width="11" height="8" rx="1" />
      <path d="M1.5 5.5h11M4 8h2M7 8h3" />
    </svg>
  ),
  form: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <rect x="1.5" y="2" width="11" height="10" rx="1" />
      <path d="M4 5h6M4 7.5h4M4 10h5" />
    </svg>
  ),
  schedule: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 4v3l2 1.5" />
    </svg>
  ),
  csv: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M3 1.5h6L11.5 4v8.5h-9z" />
      <path d="M9 1.5V4h2.5M5 7h4M5 9h4M5 11h2" />
    </svg>
  ),
  json: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5 1.5C3 1.5 3 4 3 5s0 2-1.5 2C3 7 3 9 3 10s0 2.5 2 2.5M9 1.5c2 0 2 2.5 2 3.5s0 2 1.5 2c-1.5 0-1.5 2-1.5 3s0 2.5-2 2.5" />
    </svg>
  ),
  webhook: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5 5.5l2.5-3 2.5 3M4 8a2 2 0 102 2M10 8a2 2 0 11-2 2M2.5 11h3M8.5 11h3" />
    </svg>
  ),
  plus: (p: IconProps = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" {...stroke} {...p}>
      <path d="M6 2v8M2 6h8" />
    </svg>
  ),
  play: (p: IconProps = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" fill="currentColor" strokeWidth={0} {...p}>
      <path d="M3 2l8 4-8 4V2z" />
    </svg>
  ),
  pause: (p: IconProps = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" {...p}>
      <rect x="3" y="2" width="2.5" height="8" />
      <rect x="7" y="2" width="2.5" height="8" />
    </svg>
  ),
  filter: (p: IconProps = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" {...stroke} {...p}>
      <path d="M1.5 2h9l-3.5 5v3l-2-1V7L1.5 2z" />
    </svg>
  ),
  refresh: (p: IconProps = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" {...stroke} {...p}>
      <path d="M2 2v3h3M10 10V7H7" />
      <path d="M3 7.5A4 4 0 0010 6M9 4.5A4 4 0 002 6" />
    </svg>
  ),
  arrow: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M2 7h10M9 4l3 3-3 3" />
    </svg>
  ),
  sparkles: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5 1.5l1 2.5L8.5 5 6 6l-1 2.5L4 6 1.5 5 4 4l1-2.5zM10 8l.5 1.5L12 10l-1.5.5L10 12l-.5-1.5L8 10l1.5-.5L10 8z" />
    </svg>
  ),
  shield: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 1l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V3l5-2z" />
      <path d="M5 7l1.5 1.5L9.5 5.5" />
    </svg>
  ),
  doc: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M3 1.5h6L11.5 4v8.5h-9z" />
      <path d="M9 1.5V4h2.5M5 7h4M5 9h4" />
    </svg>
  ),
  graph: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M2 11V3M2 11h10" />
      <path d="M4 9l2-3 2 2 3-5" />
    </svg>
  ),
  branch: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="3" cy="3" r="1.5" />
      <circle cx="3" cy="11" r="1.5" />
      <circle cx="11" cy="5" r="1.5" />
      <path d="M3 4.5v5M3 7s0-3 4-3" />
    </svg>
  ),
  cube: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 1.5l5 2.5v5L7 12.5 2 9V4l5-2.5z" />
      <path d="M2 4l5 2.5L12 4M7 6.5v6" />
    </svg>
  ),
  person: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="7" cy="4.5" r="2" />
      <path d="M3 12c.5-2 2-3 4-3s3.5 1 4 3" />
    </svg>
  ),
  cards: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <rect x="2" y="3" width="6" height="8" rx="1" />
      <rect x="6" y="2" width="6" height="8" rx="1" />
    </svg>
  ),
  hash: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5 1.5L4 12.5M10 1.5l-1 11M1.5 5h11M1.5 9h11" />
    </svg>
  ),
  pencil: (p: IconProps = {}) => (
    <svg width="13" height="13" viewBox="0 0 13 13" {...stroke} {...p}>
      <path d="M9 2l2 2L4 11H2v-2L9 2z" />
      <path d="M7.5 3.5l2 2" />
    </svg>
  ),
  archiveBox: (p: IconProps = {}) => (
    <svg width="13" height="13" viewBox="0 0 13 13" {...stroke} {...p}>
      <rect x="1.5" y="2" width="10" height="3" rx={0.8} />
      <path d="M2.5 5v5.5a1 1 0 001 1h6a1 1 0 001-1V5" />
      <path d="M4.5 8h4" />
    </svg>
  ),
  // ─── Extended set — added while porting shell45.jsx, auth screens, settings,
  // domains and simulations. Kept centralized here per AGENTS.md §4.
  sun: (p: IconProps = {}) => (
    <svg width="15" height="15" viewBox="0 0 16 16" {...stroke} strokeLinecap="round" {...p}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M13 3l-1.4 1.4M4.4 11.6L3 13" />
    </svg>
  ),
  moon: (p: IconProps = {}) => (
    <svg width="15" height="15" viewBox="0 0 16 16" {...stroke} {...p}>
      <path d="M13 9.5A5.5 5.5 0 016.5 3a5.5 5.5 0 105.5 6.5z" />
    </svg>
  ),
  book: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 3.5C7 3.5 5.5 2 2.5 2v8.5C5.5 10.5 7 12 7 12M7 3.5C7 3.5 8.5 2 11.5 2v8.5C8.5 10.5 7 12 7 12M7 3.5V12" />
    </svg>
  ),
  logout: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2M9 4l3 3-3 3M12 7H6" />
    </svg>
  ),
  close: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M3 3l8 8M11 3l-8 8" />
    </svg>
  ),
  check: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M3 7l3 3 5-6" />
    </svg>
  ),
  trash: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M2.5 4h9M5.5 4V2.5h3V4M4.5 4v8a1 1 0 001 1h5a1 1 0 001-1V4" />
      <path d="M6 6.5v4M8 6.5v4" />
    </svg>
  ),
  eye: (p: IconProps = {}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" {...stroke} {...p}>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  ),
  eyeOff: (p: IconProps = {}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" {...stroke} {...p}>
      <path d="M2 2l12 12M6.6 6.7a2 2 0 002.7 2.7M4.2 4.3C2.6 5.3 1.5 6.9 1 8c0 0 2.5 5 7 5 1.4 0 2.6-.4 3.6-1M9.9 3.3C9.3 3.1 8.7 3 8 3c-.4 0-.8 0-1.2.1M13.8 5C14.6 6 15 8 15 8c-.3.6-1 1.7-2.1 2.7" />
    </svg>
  ),
  mail: (p: IconProps = {}) => (
    <svg width="20" height="20" viewBox="0 0 20 20" {...stroke} {...p}>
      <rect x="2" y="4" width="16" height="12" rx="1.5" />
      <path d="M2.5 5l7.5 6 7.5-6" />
    </svg>
  ),
  lock: (p: IconProps = {}) => (
    <svg width="20" height="20" viewBox="0 0 20 20" {...stroke} {...p}>
      <rect x="4" y="9" width="12" height="8" rx="1.5" />
      <path d="M6.5 9V6a3.5 3.5 0 017 0v3" />
    </svg>
  ),
  google: (p: IconProps = {}) => (
    <svg width="16" height="16" viewBox="0 0 18 18" {...p}>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.94v2.33A9 9 0 009 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.27-1.7V4.97H.94A9 9 0 000 9c0 1.45.35 2.83.94 4.03l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.94 4.97l3.01 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  ),
  grid: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" />
      <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" />
      <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" />
      <rect x="8" y="8" width="4.5" height="4.5" rx="1" />
    </svg>
  ),
  link: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M6 8a3 3 0 004.5.3l1.5-1.5a3 3 0 00-4.2-4.2L6.7 3.7" />
      <path d="M8 6a3 3 0 00-4.5-.3L2 7.2a3 3 0 004.2 4.2l1.1-1.1" />
    </svg>
  ),
  download: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M7 1v8M3.5 6.5L7 10l3.5-3.5M2 12h10" />
    </svg>
  ),
  externalLink: (p: IconProps = {}) => (
    <svg width="13" height="13" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M5.5 2H2.5A1.5 1.5 0 001 3.5v8A1.5 1.5 0 002.5 13h8a1.5 1.5 0 001.5-1.5v-3" />
      <path d="M8.5 1.5H12.5V5.5M12 2L6.5 7.5" />
    </svg>
  ),
  info: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 6.3v3.4M7 4.3v.1" />
    </svg>
  ),
  building: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <rect x="2.5" y="1.5" width="9" height="11" rx="1" />
      <path d="M5 4.5h.01M8.5 4.5h.01M5 7h.01M8.5 7h.01M5 9.5h.01M8.5 9.5h.01" />
    </svg>
  ),
  globe: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="7" cy="7" r="5.5" />
      <path d="M1.5 7h11M7 1.5c1.8 1.6 2.8 3.6 2.8 5.5S8.8 12.4 7 14c-1.8-1.6-2.8-3.6-2.8-5.5S5.2 3.1 7 1.5z" />
    </svg>
  ),
  // ─── Auth set — added while porting the 7 Auth screens. ─────────────────
  key: (p: IconProps = {}) => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} {...p}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6M15.5 7.5l3 3" />
    </svg>
  ),
  arrowLeft: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M12 7H2M5 4 2 7l3 3" />
    </svg>
  ),
  checkCircle: (p: IconProps = {}) => (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} {...p}>
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  // ─── Simulaciones DMN — added while porting the Simulations module.
  zoomIn: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="6" cy="6" r="4.5" />
      <path d="M6 4.2v3.6M4.2 6h3.6M12.5 12.5l-3-3" />
    </svg>
  ),
  zoomOut: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <circle cx="6" cy="6" r="4.5" />
      <path d="M4.2 6h3.6M12.5 12.5l-3-3" />
    </svg>
  ),
  fitView: (p: IconProps = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" {...stroke} {...p}>
      <path d="M1.5 4.5v-3h3M9.5 1.5h3v3M12.5 9.5v3h-3M4.5 12.5h-3v-3" />
      <rect x="4.5" y="4.5" width="5" height="5" rx="0.8" />
    </svg>
  ),
} satisfies Record<string, (p?: IconProps) => JSX.Element>;

export type IconName = keyof typeof Icon;
