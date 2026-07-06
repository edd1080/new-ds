"use client";

import { useState } from "react";
import { Icon } from "../../icons/Icon";
import type { JsonTreeNode, MappingRule } from "../../types/matilda";

function TreeNodeInner({ node, depth = 0, getStatus }: { node: JsonTreeNode; depth?: number; getStatus: (key: string) => "ok" | "warn" | "none" }) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (node.key === "root") {
    return (
      <>
        {node.children?.map((c) => (
          <TreeNodeInner key={c.key} node={c} depth={0} getStatus={getStatus} />
        ))}
      </>
    );
  }
  if (node.type !== "object") {
    const st = node.mapStatus ?? getStatus(node.key);
    return (
      <div className="json-leaf" style={{ paddingLeft: `${8 + depth * 14}px` }}>
        <span className={`json-map-dot ${st}`} />
        <span className="json-key" style={{ fontSize: 11 }}>
          {node.key}
        </span>
        <span className="json-type-badge" style={{ fontSize: 9 }}>
          {node.type}
        </span>
      </div>
    );
  }
  return (
    <div className="json-node">
      <div className="json-node-head" style={{ paddingLeft: `${8 + depth * 14}px` }} onClick={() => setExpanded((o) => !o)}>
        <span className="json-caret">{expanded ? "▾" : "▸"}</span>
        <span className="json-key" style={{ fontSize: 11 }}>
          {node.key}
        </span>
        <span className="json-type-badge" style={{ fontSize: 9, color: "var(--accent)", borderColor: "var(--accent-line)", background: "var(--accent-soft)" }}>
          obj
        </span>
      </div>
      {expanded && node.children?.map((c) => <TreeNodeInner key={c.key} node={c} depth={depth + 1} getStatus={getStatus} />)}
    </div>
  );
}

export interface TreePanelProps {
  open: boolean;
  onToggle: () => void;
  rules: MappingRule[];
  tree: JsonTreeNode;
}

/** .tree-panel — collapsible JSON source tree, 220px expanded / 38px collapsed. Left panel of the Mapper Editor. */
export function TreePanel({ open, onToggle, rules, tree }: TreePanelProps) {
  const matchedPaths = new Set(rules.filter((r) => r.category === "matched").map((r) => r.sourcePath.split(".").pop()));
  const warnPaths = new Set(rules.filter((r) => r.category === "noMatch").map((r) => r.sourcePath.split(".").pop()));

  const getStatus = (key: string): "ok" | "warn" | "none" => {
    if (matchedPaths.has(key)) return "ok";
    if (warnPaths.has(key)) return "warn";
    return "none";
  };

  return (
    <div className={`tree-panel ${open ? "expanded" : "collapsed"}`}>
      <div className="tree-panel-toggle" onClick={onToggle} title={open ? "Colapsar árbol" : "Expandir árbol"}>
        {open ? <Icon.chevronLeft width={13} height={13} /> : <Icon.chevronRight width={13} height={13} />}
      </div>
      {open && (
        <>
          <div className="tree-panel-inner">
            <div className="tree-panel-lbl">JSON fuente</div>
            <div className="json-tree" style={{ fontSize: "11px" }}>
              <TreeNodeInner node={tree} getStatus={getStatus} />
            </div>
          </div>
          <div className="tree-panel-legend">
            {(
              [
                ["ok", "Con match"],
                ["warn", "Sin equiv."],
                ["none", "Sin mapear"],
              ] as const
            ).map(([c, l]) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--ink-4)" }}>
                <span className={`json-map-dot ${c}`} />
                {l}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
