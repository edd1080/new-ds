export interface UploadStepperProps {
  step: 1 | 2;
}

/** .upload-stepper — 2-step horizontal stepper (Configuración → Ingesta de datos). */
export function UploadStepper({ step }: UploadStepperProps) {
  return (
    <div className="upload-stepper">
      <div className={`upload-stepper-step ${step > 1 ? "done" : "active"}`}>
        <div className="node">{step > 1 ? "✓" : 1}</div>
        <div className="label">Configuración</div>
      </div>
      <div className={`upload-stepper-seg ${step > 1 ? "done" : ""}`} />
      <div className={`upload-stepper-step ${step === 2 ? "active" : ""}`}>
        <div className="node">2</div>
        <div className="label">Ingesta de datos</div>
      </div>
    </div>
  );
}
