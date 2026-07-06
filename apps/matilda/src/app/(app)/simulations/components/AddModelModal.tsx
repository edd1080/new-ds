"use client";

import { useState } from "react";
import { Button, SimUploadZone, SimFileRow, SimParsedCard, type DmnModel, type DmnParsedPreview } from "@bowpi/design-system";

export interface AddModelModalProps {
  onClose: () => void;
  onAdd: (model: DmnModel) => void;
}

/** Agregar modelo — sube un .dmn, muestra un preview parseado (mock) y crea el DmnModel al confirmar. */
export function AddModelModal({ onClose, onAdd }: AddModelModalProps) {
  const [modelName, setModelName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  // Mock parsed model — en producción esto viene del parser DMN real.
  const parsed: DmnParsedPreview | null = file ? { inputs: ["campo_a", "campo_b", "campo_c"], decisions: ["DecisiónUno", "DecisiónDos"] } : null;

  const handleFile = (f: File) => {
    setFile(f);
    if (!modelName) setModelName(f.name.replace(/\.dmn$/, ""));
  };

  const handleAdd = () => {
    if (!parsed || !modelName) return;
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      const now = Date.now();
      const model: DmnModel = {
        id: `mdl-${now}`,
        modelName,
        modelDescription: desc,
        creationDate: new Date().toISOString(),
        versions: [
          {
            versionId: `v-${now}`,
            name: "v1.0.0",
            description: "Versión inicial",
            published: false,
            fileSizeBytes: file?.size ?? 0,
            decisions: parsed.decisions.length,
            inputs: parsed.inputs.length,
            metadata: {
              namespace: modelName.toLowerCase().trim().replace(/\s+/g, "-"),
              decisionNames: parsed.decisions,
              inputFields: parsed.inputs,
            },
          },
        ],
      };
      onAdd(model);
    }, 800);
  };

  return (
    <div className="sim-modal-overlay" onClick={onClose}>
      <div className="sim-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sim-modal-head">
          <h2>Agregar modelo</h2>
          <p>Subí un archivo DMN — parseamos sus inputs y decisiones.</p>
        </div>
        <div className="sim-modal-body">
          <div className="form-field">
            <label>Nombre del modelo</label>
            <input className="form-input" value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="Ej: Credit Risk Scoring" />
          </div>
          <div className="form-field">
            <label>
              Descripción <span style={{ color: "var(--ink-4)", fontWeight: 400 }}>· opcional</span>
            </label>
            <textarea className="form-textarea" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Descripción del modelo…" rows={2} />
          </div>
          <div className="form-field">
            <label>Archivo DMN</label>
            {!file ? (
              <SimUploadZone label="Elegir archivo .dmn" sub="DMN 1.3 — parseado localmente al importar" accept=".dmn,application/xml,text/xml" onFile={handleFile} />
            ) : (
              <SimFileRow badge="DMN" name={file.name} meta={`Parseado · ${(file.size / 1024).toFixed(1)}KB`} onRemove={() => setFile(null)} />
            )}
          </div>
          {parsed && <SimParsedCard parsed={parsed} />}
        </div>
        <div className="sim-modal-foot">
          <span className="meta">{parsed ? `${parsed.inputs.length} inputs · ${parsed.decisions.length} decisiones parseadas` : "Sin archivo aún."}</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" disabled={!parsed || !modelName || adding} onClick={handleAdd}>
            {adding ? "Agregando…" : "Agregar modelo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
