"use client";

import { useState } from "react";
import { Icon, SlidePanel, Button } from "@bowpi/design-system";

export interface NewDomainSlideProps {
  onClose: () => void;
  onSaved: (name: string) => void;
}

/** Right-drawer form to create a new domain — ID is auto-assigned, nace en DRAFT. */
export function NewDomainSlide({ onClose, onSaved }: NewDomainSlideProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

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
      title="Nuevo dominio"
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
                Creando…
              </>
            ) : (
              "Crear dominio"
            )}
          </Button>
        </>
      }
    >
      <div className="dom-note-draft">
        El ID (D9, D10…) se asigna automáticamente. El dominio nace en estado <strong>DRAFT</strong>.
      </div>
      <div className="form-field">
        <label>
          Nombre <span className="req">*</span>
        </label>
        <input className="form-input" placeholder="Ej: Garantías reales" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-field">
        <label>Descripción</label>
        <textarea className="form-textarea" placeholder="Descripción del dominio…" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
    </SlidePanel>
  );
}
