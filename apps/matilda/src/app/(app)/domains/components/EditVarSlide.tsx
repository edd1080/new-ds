"use client";

import { useState } from "react";
import { Icon, SlidePanel, Button, Select } from "@bowpi/design-system";
import { OPERATORS_BY_TYPE, OP_LABELS, type DomainVariable } from "../../../../data/mockData";
import { PathAutocomplete } from "./PathAutocomplete";
import type { DomainMode } from "./types";

export interface EditVarSlideProps {
  variable: DomainVariable;
  mode: DomainMode;
  onClose: () => void;
  onSaved: (name: string) => void;
}

/** Right-drawer form to edit an existing variable's name, description, example and (admin-only) expression. */
export function EditVarSlide({ variable, mode, onClose, onSaved }: EditVarSlideProps) {
  const [name, setName] = useState(variable.name);
  const [description, setDescription] = useState(variable.description || "");
  const [exampleVal, setExampleVal] = useState(variable.exampleValue || "");
  const [leftPath, setLeftPath] = useState(variable.atlasDefinition?.left?.value || "");
  const [operator, setOperator] = useState(variable.atlasDefinition?.operator || "EQ");
  const [rightValue, setRightValue] = useState(variable.atlasDefinition?.right?.value || "");
  const [saving, setSaving] = useState(false);

  const operators = OPERATORS_BY_TYPE[variable.dataType] || ["EQ"];
  const isAdmin = mode === "admin";

  const handleSave = () => {
    if (!name.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSaved(name.trim());
    }, 900);
  };

  return (
    <SlidePanel
      title={`Editar variable · ${variable.id}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!name.trim() || saving}>
            {saving ? (
              <>
                <span className="spin">
                  <Icon.refresh />
                </span>{" "}
                Guardando…
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
        </>
      }
    >
      {!isAdmin && <div className="dom-note">En modo Mi organización solo podés editar nombre, descripción y ejemplo en tus propias variables.</div>}

      <div className="form-field">
        <label>Nombre técnico</label>
        <div className="dom-techname-preview">{variable.technicalName}</div>
      </div>

      <div className="form-field">
        <label>
          Nombre <span className="req">*</span>
        </label>
        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {variable.type === "S" && (
        <div className="form-field">
          <label>Path canónico</label>
          <input className="form-input mono" value={variable.sourcePath || ""} disabled style={{ opacity: 0.5, cursor: "not-allowed" }} />
          <div className="desc">El path canónico no se puede modificar desde esta UI.</div>
        </div>
      )}

      {variable.type === "C" && isAdmin && (
        <div className="form-field">
          <label>Expresión</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <div className="dom-expr-sub-label">Left — path</div>
              <PathAutocomplete value={leftPath} onChange={setLeftPath} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div className="dom-expr-sub-label">Operador</div>
                <Select value={operator} onChange={(e) => setOperator(e.target.value)}>
                  {operators.map((op) => (
                    <option key={op} value={op}>
                      {op} ({OP_LABELS[op]})
                    </option>
                  ))}
                </Select>
              </div>
              <div style={{ flex: 1 }}>
                <div className="dom-expr-sub-label">Right — const</div>
                <input className="form-input mono" value={rightValue} onChange={(e) => setRightValue(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="form-field">
        <label>Descripción</label>
        <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-field">
        <label>Ejemplo de valor</label>
        <input className="form-input" value={exampleVal} onChange={(e) => setExampleVal(e.target.value)} />
      </div>
    </SlidePanel>
  );
}
