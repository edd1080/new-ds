"use client";

import { useMemo, useState } from "react";
import { Icon, SlidePanel, Button, Select } from "@bowpi/design-system";
import { OPERATORS_BY_TYPE, OP_LABELS, slugifyTechName, type DomainRecord, type DomainVariableDataType } from "../../../../data/mockData";
import { PathAutocomplete } from "./PathAutocomplete";
import type { DomainMode } from "./types";

export interface NewVarSlideProps {
  domain: DomainRecord;
  mode: DomainMode;
  onClose: () => void;
  onSaved: (name: string) => void;
}

/** Right-drawer form to create a new S (direct) or C (calculated) variable — nace en DRAFT. */
export function NewVarSlide({ domain, onClose, onSaved }: NewVarSlideProps) {
  const [varType, setVarType] = useState<"S" | "C">("S");
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState<DomainVariableDataType>("boolean");
  const [description, setDescription] = useState("");
  const [exampleVal, setExampleVal] = useState("");
  const [sourcePath, setSourcePath] = useState("");
  const [leftPath, setLeftPath] = useState("");
  const [operator, setOperator] = useState("EQ");
  const [rightValue, setRightValue] = useState("");
  const [saving, setSaving] = useState(false);

  const techName = useMemo(() => slugifyTechName(name), [name]);
  const operators = OPERATORS_BY_TYPE[dataType] || ["EQ"];
  const isValid = name.trim() && (varType === "S" ? sourcePath.trim() : leftPath.trim() && rightValue.trim());

  const handleSave = () => {
    if (!isValid) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSaved(name.trim());
    }, 900);
  };

  return (
    <SlidePanel
      title={`Agregar variable · ${domain.id}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!isValid || saving}>
            {saving ? (
              <>
                <span className="spin">
                  <Icon.refresh />
                </span>{" "}
                Guardando…
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </>
      }
    >
      <div className="form-field">
        <label>Tipo de variable</label>
        <div className="dom-type-toggle">
          <button className={varType === "S" ? "active" : ""} onClick={() => setVarType("S")}>
            S — Directa
          </button>
          <button className={varType === "C" ? "active" : ""} onClick={() => setVarType("C")}>
            C — Calculada
          </button>
        </div>
      </div>

      <div className="form-field">
        <label>
          Nombre <span className="req">*</span>
        </label>
        <input className="form-input" placeholder="Ej: Tiene mora activa SIB" value={name} onChange={(e) => setName(e.target.value)} />
        {techName && <div className="dom-techname-preview">technicalName: {techName}</div>}
      </div>

      <div className="form-field">
        <label>Tipo de dato</label>
        <Select
          value={dataType}
          onChange={(e) => {
            const next = e.target.value as DomainVariableDataType;
            setDataType(next);
            setOperator(OPERATORS_BY_TYPE[next]?.[0] || "EQ");
          }}
        >
          <option value="boolean">Boolean</option>
          <option value="integer">Integer</option>
          <option value="number">Number</option>
          <option value="string">String</option>
        </Select>
      </div>

      {varType === "S" && (
        <div className="form-field">
          <label>
            Path canónico <span className="req">*</span>
          </label>
          <div className="desc">Seleccioná del catálogo o escribí manualmente.</div>
          <PathAutocomplete value={sourcePath} onChange={setSourcePath} placeholder="Ej: profile.personalInfo.nationalId" />
        </div>
      )}

      {varType === "C" && (
        <div className="form-field">
          <label>
            Expresión OPERATOR_EXPR <span className="req">*</span>
          </label>
          <div className="desc">Predicado simple: path izquierdo · operador · valor constante.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            <div>
              <div className="dom-expr-sub-label">Left — path</div>
              <PathAutocomplete value={leftPath} onChange={setLeftPath} placeholder="Ej: bureaus.score" />
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
                <input className="form-input mono" placeholder="Valor…" value={rightValue} onChange={(e) => setRightValue(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="form-field">
        <label>Descripción</label>
        <textarea className="form-textarea" placeholder="Descripción breve de la variable…" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-field">
        <label>Ejemplo de valor</label>
        <input className="form-input" placeholder="Ej: true, 650, DEPENDIENTE…" value={exampleVal} onChange={(e) => setExampleVal(e.target.value)} />
      </div>

      <div className="dom-note-draft">
        Toda variable nueva nace en estado <strong>DRAFT</strong>. Activala para que entre al próximo snapshot publicado.
      </div>
    </SlidePanel>
  );
}
