"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, SurfaceHeader, Button, Dot, FormField, FormInput, Toggle } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";

type NotifKey = "saves" | "errors" | "canonical";

const NOTIF_ROWS: Array<{ key: NotifKey; label: string; desc: string }> = [
  { key: "saves", label: "Guardados exitosos", desc: "Confirmar cuando un proyecto se guarda correctamente" },
  { key: "errors", label: "Errores del agente", desc: "Alertar cuando el agente no puede procesar el JSON" },
  { key: "canonical", label: "Actualizaciones del canónico", desc: "Notificar cuando hay una nueva versión del modelo" },
];

const WORKSPACE_FIELDS: Array<{ k: string; v: string; mono?: boolean }> = [
  { k: "Institución", v: "Banco Solidario" },
  { k: "Tenant ID", v: "bs.prod", mono: true },
  { k: "Ambiente", v: "producción" },
  { k: "Canónico", v: "v9.0.0" },
];

/** Section wrapper local to this screen — title + card, reused across the 6 Settings sections. */
function SettingsSection({ title, danger, children }: { title: string; danger?: boolean; children: React.ReactNode }) {
  return (
    <div className="settings-section">
      <div className="settings-section-title" style={danger ? { color: "var(--err)" } : undefined}>
        {title}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const go = (surface: string) => router.push(`/${surface}`);

  const theme = useMatildaStore((s) => s.theme);
  const setTheme = useMatildaStore((s) => s.setTheme);
  const reset = useMatildaStore((s) => s.reset);

  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({ saves: true, errors: true, canonical: false });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetWorkspace = () => {
    // No ConfirmDialog component exists yet in the design system — window.confirm
    // is used as a lightweight guard for this destructive action.
    if (!window.confirm("¿Reiniciar el workspace? Se eliminará todo el progreso local. Los datos en el servidor no se afectan.")) {
      return;
    }
    reset();
    go("overview");
  };

  return (
    <>
      <SurfaceHeader
        crumbs="WORKSPACE / AJUSTES"
        title="Ajustes"
        sub="Configurá tu cuenta, preferencias y workspace de implementación."
        actions={
          <Button variant="ghost" onClick={() => go("overview")}>
            <Icon.chevronLeft /> Volver
          </Button>
        }
      />

      <div style={{ padding: "0 var(--pad-surface) 60px", maxWidth: 660 }}>
        {/* Perfil */}
        <SettingsSection title="Perfil">
          <div className="settings-card">
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "var(--accent-soft)",
                  border: "2px solid var(--accent-line)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--accent-ink)",
                  flexShrink: 0,
                }}
              >
                JF
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink-1)", marginBottom: 2 }}>Jonatán Fernández</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>jonatan@bowpi.com</div>
                <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 3 }}>Implementación · Banco Solidario</div>
              </div>
            </div>

            <FormField label="Nombre">
              <FormInput defaultValue="Jonatán Fernández" />
            </FormField>
            <div style={{ marginTop: 14 }}>
              <FormField label="Correo electrónico">
                <FormInput defaultValue="jonatan@bowpi.com" disabled style={{ opacity: 0.6 }} />
              </FormField>
            </div>
            <div style={{ marginTop: 14 }}>
              <FormField label="Rol">
                <FormInput defaultValue="Implementación" disabled style={{ opacity: 0.6 }} />
              </FormField>
            </div>
          </div>
        </SettingsSection>

        {/* Workspace */}
        <SettingsSection title="Workspace">
          <div className="settings-card">
            <div className="field-info-card" style={{ marginBottom: 0 }}>
              {WORKSPACE_FIELDS.map(({ k, v, mono }) => (
                <div key={k} className="field-info-row">
                  <span className="fk">{k}</span>
                  <span className="fv" style={mono ? { fontFamily: "var(--font-mono)", color: "var(--accent-ink)" } : undefined}>
                    {v}
                  </span>
                </div>
              ))}
              <div className="field-info-row">
                <span className="fk">Mapper Svc</span>
                <span className="fv" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Dot tone="ok" /> online · operativo
                </span>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Apariencia */}
        <SettingsSection title="Apariencia">
          <div className="settings-card">
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 550, color: "var(--ink-2)", marginBottom: 10 }}>Tema</div>
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant={theme === "light" ? "primary" : "default"} style={{ flex: 1 }} onClick={() => setTheme("light")}>
                  <Icon.sun /> Claro
                </Button>
                <Button variant={theme === "dark" ? "primary" : "default"} style={{ flex: 1 }} onClick={() => setTheme("dark")}>
                  <Icon.moon /> Oscuro
                </Button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 550, color: "var(--ink-2)", marginBottom: 8 }}>Idioma</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  background: "var(--surface-3)",
                  borderRadius: "var(--r-sm)",
                  fontSize: 12.5,
                  color: "var(--ink-3)",
                }}
              >
                <Icon.globe /> Español (es-419)
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-5)" }}>único disponible</span>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Notificaciones */}
        <SettingsSection title="Notificaciones">
          <div className="settings-card">
            {NOTIF_ROWS.map(({ key, label, desc }, i) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: i > 0 ? "14px 0 0" : "0 0 14px",
                  borderBottom: i < NOTIF_ROWS.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 550, color: "var(--ink-1)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{desc}</div>
                </div>
                <Toggle on={notifs[key]} onChange={(next) => setNotifs((p) => ({ ...p, [key]: next }))} />
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Seguridad */}
        <SettingsSection title="Seguridad">
          <div className="settings-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 550, color: "var(--ink-1)", marginBottom: 2 }}>Contraseña</div>
                <div style={{ fontSize: 12, color: "var(--ink-4)" }}>Última actualización: hace 3 meses</div>
              </div>
              <Button size="sm" variant="ghost">
                Cambiar
              </Button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 550, color: "var(--ink-1)", marginBottom: 2 }}>Sesiones activas</div>
                <div style={{ fontSize: 12, color: "var(--ink-4)" }}>1 dispositivo · Chrome · Última actividad: ahora</div>
              </div>
              <Button size="sm" variant="ghost">
                Ver
              </Button>
            </div>
          </div>
        </SettingsSection>

        {/* Zona de peligro */}
        <SettingsSection title="Zona de peligro" danger>
          <div className="settings-card" style={{ border: "1px solid var(--err-line)", background: "var(--err-soft)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--err)", marginBottom: 4 }}>Reiniciar workspace</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5 }}>
                  Elimina todo el progreso local. Los datos en el servidor no se afectan.
                </div>
              </div>
              <Button
                size="sm"
                style={{ borderColor: "var(--err-line)", color: "var(--err)", background: "transparent", flexShrink: 0 }}
                onClick={handleResetWorkspace}
              >
                Reiniciar
              </Button>
            </div>
          </div>
        </SettingsSection>

        {/* Save bar */}
        <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
          <Button variant="primary" onClick={handleSave}>
            {saved ? (
              <>
                <Icon.check /> Guardado
              </>
            ) : (
              "Guardar cambios"
            )}
          </Button>
          <Button variant="ghost" onClick={() => go("overview")}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
}
