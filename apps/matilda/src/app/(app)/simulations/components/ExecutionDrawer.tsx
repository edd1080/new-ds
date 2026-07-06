"use client";

import { useState } from "react";
import { SimDrawer, SimDmnCanvas, SimNodeDetailPanel, SimBottomPanel, simBuildOverlay, simExecLatency, type SimExecution } from "@bowpi/design-system";
import { SIM_DMN_GRAPH } from "../../../../data/simulationsData";

export interface ExecutionDrawerProps {
  execution: SimExecution;
  simModelId: string;
  execIndex: number;
  onClose: () => void;
}

/** Composes SimDrawer + SimDmnCanvas + SimNodeDetailPanel + SimBottomPanel for one execution's fullscreen detail view. */
export function ExecutionDrawer({ execution, simModelId, execIndex, onClose }: ExecutionDrawerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const graph = SIM_DMN_GRAPH[simModelId] || { nodes: [], edges: [] };
  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);
  const overlay = simBuildOverlay(execution);

  return (
    <SimDrawer
      execIndex={execIndex}
      success={execution.success}
      latencyMs={simExecLatency(execution)}
      decisionCount={execution.decisionResults.length}
      onClose={onClose}
      bottomPanel={<SimBottomPanel execution={execution} />}
    >
      <SimDmnCanvas graph={graph} overlay={overlay} selectedNodeId={selectedNodeId} onSelectNode={setSelectedNodeId} />
      {selectedNode && (
        <SimNodeDetailPanel
          node={selectedNode}
          overlay={selectedNode.data.decisionId ? overlay[selectedNode.data.decisionId] : undefined}
          inputValue={selectedNode.type === "inputData" ? execution.request?.[selectedNode.data.label] : undefined}
          onClose={() => setSelectedNodeId(null)}
        />
      )}
    </SimDrawer>
  );
}
