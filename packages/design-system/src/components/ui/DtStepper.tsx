export interface DtStepperItem {
  label: string;
  state: "done" | "active" | "locked";
  onClick?: () => void;
}

export interface DtStepperProps {
  projectName?: string;
  steps: DtStepperItem[];
}

/** .dt-stepper — vertical stepper in sidebar for the active Data Translation project. */
export function DtStepper({ projectName, steps }: DtStepperProps) {
  return (
    <div>
      {projectName && <div className="dt-project-name">{projectName}</div>}
      <div className="dt-stepper">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`dt-step ${s.state}`}
            onClick={s.state !== "locked" ? s.onClick : undefined}
            style={{ cursor: s.state === "locked" ? "not-allowed" : "pointer" }}
          >
            <div className="dt-step-line" />
            <div className="dt-step-node">{s.state === "done" ? "✓" : i + 1}</div>
            <div className="dt-step-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
