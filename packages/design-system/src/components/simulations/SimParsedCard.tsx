import { Chip } from "../ui/Chip";
import { Dot } from "../primitives/Dot";
import type { DmnParsedPreview } from "./types";

export interface SimParsedCardProps {
  parsed: DmnParsedPreview;
}

/** .sim-parsed-card — parsed DMN preview (inputs chips + decisions list), Agregar modelo modal. */
export function SimParsedCard({ parsed }: SimParsedCardProps) {
  return (
    <div className="sim-parsed-card">
      <div className="sim-parsed-head">
        <Chip tone="info">{parsed.inputs.length} inputs</Chip>
        <Chip tone="ok">{parsed.decisions.length} decisiones</Chip>
      </div>
      <div className="sim-parsed-body">
        <div className="sim-parsed-lbl">Input data</div>
        <div className="sim-chips-row">
          {parsed.inputs.map((i) => (
            <Chip key={i}>{i}</Chip>
          ))}
        </div>
        <div className="sim-parsed-lbl">Decisiones</div>
        {parsed.decisions.map((d) => (
          <div key={d} className="sim-decision-row">
            <Dot tone="ok" />
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
