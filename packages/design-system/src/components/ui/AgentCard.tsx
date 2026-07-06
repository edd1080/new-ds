import type { ReactNode } from "react";
import { Icon } from "../../icons/Icon";
import { Chip } from "./Chip";
import { Dot } from "../primitives/Dot";
import { Spinner } from "./Spinner";

export interface AgentStep {
  label: string;
  state: "done" | "running" | "idle";
}

export interface AgentCardProps {
  title?: ReactNode;
  steps: AgentStep[];
  ready?: boolean;
}

/** .agent-card — AI agent header + step list (done/running/idle). */
export function AgentCard({ title = "Agente de mapeo", steps, ready }: AgentCardProps) {
  return (
    <div className="agent-card">
      <div className="agent-card-head">
        <Icon.sparkles /> {title}
        {ready && (
          <Chip tone="ok" style={{ marginLeft: "auto" }}>
            <Dot tone="ok" /> listo
          </Chip>
        )}
      </div>
      <div className="agent-card-body">
        {steps.map((s, i) => (
          <div key={i} className={`agent-step-row ${s.state}`}>
            <div className={`agent-step-icon ${s.state}`}>{s.state === "done" ? "✓" : s.state === "running" ? <Spinner width={11} height={11} /> : ""}</div>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
