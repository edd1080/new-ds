"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CANONICAL_CATALOG } from "../../../../data/mockData";

export interface PathAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** .dom-autocomplete — free-text input with a canonical-path suggestion dropdown. */
export function PathAutocomplete({ value, onChange, placeholder }: PathAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const filtered = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return CANONICAL_CATALOG.filter((c) => c.path.toLowerCase().includes(q) || (c.name || "").toLowerCase().includes(q)).slice(0, 10);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const select = (path: string) => {
    onChange(path);
    setQuery(path);
    setOpen(false);
  };

  return (
    <div className="dom-autocomplete" ref={ref}>
      <input
        className="form-input mono"
        placeholder={placeholder || "Buscar o escribir path canónico…"}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
      />
      {open && filtered.length > 0 && (
        <div className="dom-autocomplete-drop">
          {filtered.map((c) => (
            <div key={c.path} className="dom-autocomplete-item" onMouseDown={() => select(c.path)}>
              <div className="dom-autocomplete-path">{c.path}</div>
              {c.name && <div className="dom-autocomplete-name">{c.name}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
