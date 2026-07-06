"use client";

import { useEffect, useState } from "react";
import { Icon, Button, ConfirmDialog } from "@bowpi/design-system";
import { VERSIONS_MOCK, type DomainRecord, type DomainVersion } from "../../../../data/mockData";
import { VigentePanel } from "./VigentePanel";
import { VersionRow, type VersionAction } from "./VersionRow";
import type { ConfirmState, DomainMode } from "./types";

export interface VersionsTabProps {
  domain: DomainRecord;
  mode: DomainMode;
  onPublish: () => void;
  onShowToast: (msg: string, tone?: "ok" | "warn") => void;
}

/** Versiones tab — immutable snapshot history, with enable/disable/make-active/archive lifecycle. */
export function VersionsTab({ domain, mode, onPublish, onShowToast }: VersionsTabProps) {
  const [versions, setVersions] = useState<DomainVersion[]>(() => (VERSIONS_MOCK[domain.id] || []).map((v) => ({ ...v })));
  const [activeVer, setActiveVer] = useState<string | null>(domain.activeVersion);
  const [showVigente, setShowVigente] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  useEffect(() => {
    setVersions((VERSIONS_MOCK[domain.id] || []).map((v) => ({ ...v })));
    setActiveVer(domain.activeVersion);
    setShowVigente(false);
  }, [domain.id, domain.activeVersion]);

  const recalcActive = (newVersions: DomainVersion[], excludeVer: string): string | null => {
    const remaining = newVersions.filter((v) => v.enabled && !v.archived && v.version !== excludeVer);
    return remaining.length > 0 ? remaining[0].version : null;
  };

  const handleAction = (kind: VersionAction, ver: DomainVersion) => {
    const cfgs: Record<VersionAction, ConfirmState> = {
      "enable-activate": {
        title: "Habilitar y activar versión",
        message: `v${ver.version} quedará habilitada y pasará a ser la vigente. Las demás versiones habilitadas se conservan para rollback.`,
        confirmLabel: "Habilitar y activar",
        onConfirm: () => {
          setVersions((prev) => prev.map((v) => (v.version === ver.version ? { ...v, enabled: true } : v)));
          setActiveVer(ver.version);
          setConfirm(null);
          onShowToast(`v${ver.version} habilitada y activa.`);
        },
      },
      "make-active": {
        title: "Hacer versión activa",
        message: `v${ver.version} pasará a ser la vigente. Las demás versiones habilitadas se conservan.`,
        confirmLabel: "Hacer activa",
        onConfirm: () => {
          setActiveVer(ver.version);
          setConfirm(null);
          onShowToast(`v${ver.version} es ahora la activa.`);
        },
      },
      disable: {
        title: "Deshabilitar versión",
        message: `v${ver.version} se deshabilitará.${ver.version === activeVer ? " Era la activa — el sistema recuperará automáticamente la siguiente habilitada." : ""}`,
        confirmLabel: "Deshabilitar",
        onConfirm: () => {
          const next = ver.version === activeVer ? recalcActive(versions, ver.version) : activeVer;
          setVersions((prev) => prev.map((v) => (v.version === ver.version ? { ...v, enabled: false } : v)));
          setActiveVer(next);
          setConfirm(null);
          onShowToast(`v${ver.version} deshabilitada.`, "warn");
        },
      },
      archive: {
        title: "Archivar versión",
        confirmLabel: "Archivar",
        confirmStyle: "danger",
        message: `v${ver.version} se archivará de forma irreversible.${ver.version === activeVer ? " Era la activa — el sistema recuperará la siguiente habilitada." : ""}`,
        onConfirm: () => {
          const next = ver.version === activeVer ? recalcActive(versions, ver.version) : activeVer;
          setVersions((prev) => prev.map((v) => (v.version === ver.version ? { ...v, archived: true, enabled: false } : v)));
          setActiveVer(next);
          setConfirm(null);
          onShowToast(`v${ver.version} archivada definitivamente.`, "warn");
        },
      },
    };
    setConfirm(cfgs[kind]);
  };

  const visibleVersions = mode === "admin" ? versions : versions.filter((v) => v.enabled && !v.archived);

  return (
    <>
      <div className="dom-ver-header">
        <Button size="sm" variant={showVigente ? "primary" : "default"} onClick={() => setShowVigente((v) => !v)}>
          <Icon.data /> Ver vigente
        </Button>
        {mode === "admin" && (
          <Button size="sm" onClick={onPublish}>
            <Icon.plus /> Publicar versión
          </Button>
        )}
        <div style={{ flex: 1 }} />
        {mode === "admin" && (
          <div className="dom-note" style={{ fontSize: 11.5, maxWidth: 360, margin: 0, lineHeight: 1.5 }}>
            Varias versiones pueden estar habilitadas a la vez. La marcada &quot;Activa&quot; es la vigente. Usá ★ Hacer activa para cambiar entre ellas.
          </div>
        )}
      </div>

      {showVigente && <VigentePanel domain={domain} activeVer={activeVer} onClose={() => setShowVigente(false)} />}

      {visibleVersions.length === 0 ? (
        <div className="dom-empty">
          <Icon.bolt width={28} height={28} />
          <h3>Sin versiones publicadas</h3>
          <p>Activá variables y usá &quot;Publicar versión&quot; para crear el primer snapshot inmutable.</p>
        </div>
      ) : (
        <div className="dom-ver-table-wrap">
          <table className="dom-ver-table">
            <thead>
              <tr>
                <th>Versión</th>
                <th>Tag</th>
                <th>Variables</th>
                <th>Publicado por</th>
                <th>Fecha</th>
                <th>Estado</th>
                {mode === "admin" && <th>Acciones</th>}
                <th style={{ width: 30 }}></th>
              </tr>
            </thead>
            <tbody>
              {visibleVersions.map((ver) => (
                <VersionRow key={ver.version} ver={ver} domain={domain} isActive={ver.version === activeVer} mode={mode} onAction={handleAction} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirm && (
        <ConfirmDialog title={confirm.title} message={confirm.message} confirmLabel={confirm.confirmLabel} confirmStyle={confirm.confirmStyle} onConfirm={confirm.onConfirm} onClose={() => setConfirm(null)} />
      )}
    </>
  );
}
