"use client";

import { useState, type ReactNode } from "react";

export interface Section4Props {
  tone: "matched" | "nomatch";
  label: string;
  count: number;
  children: ReactNode;
}

/** .section4-head — collapsible section wrapper for the Mapper's rules list (Mapeadas / Sin mapear). */
export function Section4({ tone, label, count, children }: Section4Props) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className={`section4-head ${tone}`} onClick={() => setOpen((o) => !o)}>
        <span className="sec-label">{label}</span>
        <span className="sec-count">{count}</span>
        <span style={{ fontSize: 10, marginLeft: 4 }}>{open ? "▾" : "▸"}</span>
      </div>
      {open && <div className="section4-items">{children}</div>}
    </div>
  );
}
