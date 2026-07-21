"use client";

import { useState } from "react";
import type { JsonTreeNode } from "../../types/matilda";

export interface JsonTreeProps {
  node: JsonTreeNode;
  /** Initial expansion state for every object node. Omit to preserve the depth-based default. */
  defaultExpanded?: boolean;
}

/** .json-tree — root entry point. Renders top-level children of a synthetic "root" node. */
export function JsonTree({ node, defaultExpanded }: JsonTreeProps) {
  if (node.key === "root" && node.children) {
    return (
      <div className="json-tree">
        {node.children.map((c) => (
          <JsonNode key={c.key} node={c} depth={0} path="" defaultExpanded={defaultExpanded} />
        ))}
      </div>
    );
  }
  return (
    <div className="json-tree">
      <JsonNode node={node} depth={0} path="" defaultExpanded={defaultExpanded} />
    </div>
  );
}

export interface JsonNodeProps {
  node: JsonTreeNode;
  depth?: number;
  path?: string;
  defaultExpanded?: boolean;
}

/** .json-node / .json-leaf — a single collapsible node in the JSON tree (mapper + upload). */
export function JsonNode({ node, depth = 0, path = "", defaultExpanded }: JsonNodeProps) {
  const [open, setOpen] = useState(() => defaultExpanded ?? depth < 2);
  const fullPath = path ? `${path}.${node.key}` : node.key;

  if (node.type !== "object") {
    return (
      <div className="json-leaf">
        <span className={`json-map-dot ${node.mapStatus ?? "none"}`} />
        <span className="json-key">{node.key}</span>
        <span className="json-type-badge">{node.type}</span>
        <span className="json-val">{node.value}</span>
      </div>
    );
  }

  return (
    <div className="json-node">
      <div className="json-node-head" onClick={() => setOpen((o) => !o)}>
        <span className="json-caret">{open ? "▾" : "▸"}</span>
        <span className="json-key">{node.key}</span>
        <span className="json-type-badge" style={{ color: "var(--accent)", borderColor: "var(--accent-line)", background: "var(--accent-soft)" }}>
          obj
        </span>
        {!open && <span className="json-val">{node.children?.length ?? 0} campos</span>}
      </div>
      {open && (
        <div className="json-node-children">
          {node.children?.map((c) => (
            <JsonNode key={c.key} node={c} depth={depth + 1} path={fullPath} defaultExpanded={defaultExpanded} />
          ))}
        </div>
      )}
    </div>
  );
}
