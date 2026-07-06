/**
 * Matilda 4.5 — Simulaciones · Grafo DMN (SVG placeholder canvas).
 * Ported from project/v4/simulations-drawer.jsx (DmnSvgGraph + node renderers + controls).
 *
 * MIGRATION NOTE (kept from the source prototype):
 * This is a placeholder implementation — plain SVG for edges + absolutely
 * positioned divs for nodes, with manual pan (mouse drag) / zoom (wheel).
 * It exists to be swapped for `@xyflow/react` later. Because DmnNode/DmnEdge
 * (see ./types) are already shaped like React Flow's node/edge objects
 * (`{ id, position: { x, y }, data }` / `{ id, source, target }`), that swap
 * only touches this file's render layer:
 *   <ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={{ inputData: SimDmnNodeInput, decision: SimDmnNodeDecision }} fitView>
 *     <Background /><Controls /><MiniMap />
 *   </ReactFlow>
 */
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "../../icons/Icon";
import type { DmnGraph, DmnNode, SimOverlayMap } from "./types";

const NODE_W: Record<string, number> = { decision: 160, inputData: 130 };
const NODE_H: Record<string, number> = { decision: 80, inputData: 36 };

type NodeStatusCls = "ok" | "err" | "skip" | "";

function statusClassFor(node: DmnNode, overlay: SimOverlayMap): NodeStatusCls {
  const ov = node.data.decisionId ? overlay[node.data.decisionId] : undefined;
  if (!ov) return "";
  if (ov.status === "SUCCEEDED") return "ok";
  if (ov.status === "FAILED") return "err";
  return "skip";
}

export interface SimDmnNodeProps {
  node: DmnNode;
  overlay: SimOverlayMap;
  selected: boolean;
  onSelect: () => void;
}

/** .sim-node-decision — decision node, optionally overlaid with an execution's outcome. */
export function SimDmnNodeDecision({ node, overlay, selected, onSelect }: SimDmnNodeProps) {
  const ov = node.data.decisionId ? overlay[node.data.decisionId] : undefined;
  const statusCls = statusClassFor(node, overlay);
  const badgeLabel = ov ? (ov.status === "SUCCEEDED" ? "OK" : ov.status === "FAILED" ? "FAIL" : "SKIP") : null;
  return (
    <div
      className={`sim-dmn-node sim-node-decision ${statusCls} ${selected ? "selected" : ""}`}
      style={{ left: node.position.x, top: node.position.y }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="sim-node-inner">
        {badgeLabel && <span className={`sim-node-badge ${statusCls}`}>{badgeLabel}</span>}
        <div className="sim-node-name">{node.data.label}</div>
        {ov?.result != null && <div className="sim-node-result">{String(ov.result)}</div>}
      </div>
    </div>
  );
}

/** .sim-node-input — input data node (pill shape, info tone). */
export function SimDmnNodeInput({ node, selected, onSelect }: SimDmnNodeProps) {
  return (
    <div
      className={`sim-dmn-node sim-node-input ${selected ? "selected" : ""}`}
      style={{ left: node.position.x, top: node.position.y }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <div className="sim-node-inner">
        <div className="sim-node-name">{node.data.label}</div>
      </div>
    </div>
  );
}

export interface SimDmnControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

/** .sim-dmn-controls — zoom in/out + fit view, bottom-left of the canvas. */
export function SimDmnControls({ onZoomIn, onZoomOut, onFitView }: SimDmnControlsProps) {
  return (
    <div className="sim-dmn-controls">
      <button onClick={onZoomIn} title="Acercar">
        <Icon.zoomIn width={13} height={13} />
      </button>
      <button onClick={onZoomOut} title="Alejar">
        <Icon.zoomOut width={13} height={13} />
      </button>
      <button onClick={onFitView} title="Ajustar vista">
        <Icon.fitView width={13} height={13} />
      </button>
    </div>
  );
}

export interface SimDmnCanvasProps {
  graph: DmnGraph;
  /** decisionId → DecisionResult, built via simBuildOverlay(execution). */
  overlay?: SimOverlayMap;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
}

/** .sim-dmn-wrap — pan/zoom SVG canvas rendering a DMN decision graph. */
export function SimDmnCanvas({ graph, overlay = {}, selectedNodeId, onSelectNode }: SimDmnCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 60, y: 60 });
  const [zoom, setZoom] = useState(1);
  const dragging = useRef<{ startX: number; startY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const arrowId = `sim-dmn-arrow-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".sim-dmn-node")) return;
    dragging.current = { startX: e.clientX - pan.x, startY: e.clientY - pan.y };
    setIsDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPan({ x: e.clientX - dragging.current.startX, y: e.clientY - dragging.current.startY });
  };
  const onMouseUp = () => {
    dragging.current = null;
    setIsDragging(false);
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => Math.max(0.3, Math.min(2, z - e.deltaY * 0.001)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const fitView = () => {
    setPan({ x: 60, y: 60 });
    setZoom(1);
  };

  if (graph.nodes.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--ink-4)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
        No hay grafo DMN para este modelo.
      </div>
    );
  }

  const nodeMap: Record<string, DmnNode> = {};
  graph.nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  const edgePaths = graph.edges.map((edge) => {
    const src = nodeMap[edge.source];
    const tgt = nodeMap[edge.target];
    if (!src || !tgt) return null;
    const sy = src.position.y + (NODE_H[src.type] || 60);
    const ty = tgt.position.y;
    const sx = src.position.x + (NODE_W[src.type] || 140) / 2;
    const tx = tgt.position.x + (NODE_W[tgt.type] || 140) / 2;
    const cy = (sy + ty) / 2;
    const isDashed = edge.type === "authorityRequirement";
    return (
      <path
        key={edge.id}
        d={`M ${sx} ${sy} C ${sx} ${cy}, ${tx} ${cy}, ${tx} ${ty}`}
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth={1.5}
        strokeDasharray={isDashed ? "5,4" : undefined}
        markerEnd={`url(#${arrowId})`}
      />
    );
  });

  const maxX = Math.max(...graph.nodes.map((n) => n.position.x + (NODE_W[n.type] || 140))) + 80;
  const maxY = Math.max(...graph.nodes.map((n) => n.position.y + (NODE_H[n.type] || 80))) + 80;

  return (
    <div
      ref={wrapRef}
      className="sim-dmn-wrap"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="sim-dmn-transform" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
        <svg className="sim-dmn-svg" width={maxX} height={maxY} style={{ width: maxX, height: maxY }}>
          <defs>
            <marker id={arrowId} markerWidth={8} markerHeight={8} refX={6} refY={3} orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="var(--line-strong)" />
            </marker>
          </defs>
          {edgePaths}
        </svg>

        <div className="sim-dmn-nodes" style={{ position: "absolute", top: 0, left: 0 }}>
          {graph.nodes.map((node) =>
            node.type === "inputData" ? (
              <SimDmnNodeInput key={node.id} node={node} overlay={overlay} selected={selectedNodeId === node.id} onSelect={() => onSelectNode(selectedNodeId === node.id ? null : node.id)} />
            ) : (
              <SimDmnNodeDecision key={node.id} node={node} overlay={overlay} selected={selectedNodeId === node.id} onSelect={() => onSelectNode(selectedNodeId === node.id ? null : node.id)} />
            ),
          )}
        </div>
      </div>

      <SimDmnControls onZoomIn={() => setZoom((z) => Math.min(2, z + 0.15))} onZoomOut={() => setZoom((z) => Math.max(0.3, z - 0.15))} onFitView={fitView} />
    </div>
  );
}
