import { useState } from "react";
import { Icon } from "../../icons/Icon";
import { Button } from "../ui/Button";
import { SimCard } from "./SimCard";
import { SimFilterChip } from "./SimFilterChip";
import type { Simulation, SimStatus } from "./types";

interface FilterOption {
  key: "ALL" | SimStatus;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: "ALL", label: "Todas" },
  { key: "RUNNING", label: "Ejecutando" },
  { key: "COMPLETED", label: "Completadas" },
  { key: "FAILED", label: "Fallidas" },
];

export interface SimHistorySidebarProps {
  simulations: Simulation[];
  selectedId?: string | null;
  onSelect: (sim: Simulation) => void;
  onNew: () => void;
}

/** .sim-history — 300px history sidebar: search + status filter chips + sim card list. */
export function SimHistorySidebar({ simulations, selectedId, onSelect, onNew }: SimHistorySidebarProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterOption["key"]>("ALL");

  const filtered = simulations.filter((s) => {
    const matchFilter = filter === "ALL" || s.status === filter;
    const q = query.toLowerCase();
    const matchQuery = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    return matchFilter && matchQuery;
  });

  const countFor = (key: FilterOption["key"]) => (key === "ALL" ? simulations.length : simulations.filter((s) => s.status === key).length);

  return (
    <aside className="sim-history">
      <div className="sim-history-head">
        <div className="sim-history-title">
          <span>
            Historial · <span style={{ color: "var(--accent-ink)" }}>{simulations.length}</span>
          </span>
          <Button variant="primary" size="sm" onClick={onNew}>
            <Icon.plus /> Nueva
          </Button>
        </div>

        <div className="sim-history-search">
          <Icon.search width={13} height={13} />
          <input placeholder="Buscar simulaciones…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="sim-filter-row">
          {FILTER_OPTIONS.map((f) => (
            <SimFilterChip key={f.key} active={filter === f.key} count={countFor(f.key)} onClick={() => setFilter(f.key)}>
              {f.label}
            </SimFilterChip>
          ))}
        </div>
      </div>

      <div className="sim-history-list">
        {filtered.length === 0 && <div className="sim-history-empty">Sin resultados.</div>}
        {filtered.map((sim) => (
          <SimCard key={sim.id} sim={sim} active={sim.id === selectedId} onClick={() => onSelect(sim)} />
        ))}
      </div>
    </aside>
  );
}
