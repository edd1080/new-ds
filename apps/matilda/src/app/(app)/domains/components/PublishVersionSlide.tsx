"use client";

import { useState } from "react";
import { Icon, SlidePanel, Button, Checkbox } from "@bowpi/design-system";
import { VARIABLES_MOCK, type DomainRecord } from "../../../../data/mockData";

export interface PublishVersionSlideProps {
  domain: DomainRecord;
  onClose: () => void;
  onSaved: (tag: string) => void;
}

/** Right-drawer form to publish an immutable snapshot of the domain's current ACTIVE variables. */
export function PublishVersionSlide({ domain, onClose, onSaved }: PublishVersionSlideProps) {
  const [tag, setTag] = useState("dev");
  const [description, setDescription] = useState("");
  const [enableNow, setEnableNow] = useState(false);
  const [saving, setSaving] = useState(false);

  const activeVarsCnt = (VARIABLES_MOCK[domain.id] || []).filter((v) => v.status === "active").length;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSaved(tag || "dev");
    }, 1100);
  };

  return (
    <SlidePanel
      title={`Publicar versión · ${domain.id}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <span className="spin">
                  <Icon.refresh />
                </span>{" "}
                Publicando…
              </>
            ) : (
              "Publicar versión"
            )}
          </Button>
        </>
      }
    >
      <div className="dom-note">
        Se creará un snapshot inmutable con las <strong>{activeVarsCnt} variables ACTIVE</strong> actuales de {domain.id}. El semver se calcula automáticamente con patch bump.
      </div>

      <div className="form-field">
        <label>Tag de versión</label>
        <div className="desc">Etiqueta descriptiva del release (dev, stable, beta…).</div>
        <input className="form-input mono" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="dev" />
      </div>

      <div className="form-field">
        <label>Descripción del cambio</label>
        <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Resumen de los cambios incluidos en esta versión…" />
      </div>

      <Checkbox
        checked={enableNow}
        onChange={setEnableNow}
        label="Habilitar inmediatamente"
        hint="La versión pasará a ser la activa al publicar. Si está desmarcado, quedará deshabilitada hasta que la actives manualmente."
      />
    </SlidePanel>
  );
}
