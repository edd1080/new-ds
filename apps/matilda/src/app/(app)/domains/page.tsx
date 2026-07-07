"use client";

import { useEffect, useState } from "react";
import { Icon, TabsFlush, EmptyState } from "@bowpi/design-system";
import { DOMAINS_MOCK, domainStatusLabel, domainStatusTone } from "../../../data/mockData";
import { VarsTab } from "./components/VarsTab";
import { VersionsTab } from "./components/VersionsTab";
import { NewDomainSlide } from "./components/NewDomainSlide";
import { PublishVersionSlide } from "./components/PublishVersionSlide";
import type { DomainMode, ToastState } from "./components/types";

/** Dominios del sistema — catálogo de variables crediticias agrupadas en dominios. Ported from project/v4/surf-domains.jsx. */
export default function DomainsPage() {
  const [mode, setMode] = useState<DomainMode>("admin");
  const [selectedId, setSelectedId] = useState("D5");
  const [activeTab, setActiveTab] = useState<"vars" | "versions">("vars");
  const [slideOpen, setSlideOpen] = useState<null | "publish" | "new-domain">(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".main");
    const scroll = document.querySelector<HTMLElement>(".main-scroll");
    const prevMainOverflow = main?.style.overflowY;
    const prevScrollHeight = scroll?.style.height;
    if (main) {
      main.style.overflowY = "hidden";
      main.style.height = "100%";
    }
    if (scroll) {
      scroll.style.height = "100%";
      scroll.style.minHeight = "unset";
    }
    return () => {
      if (main) {
        main.style.overflowY = prevMainOverflow || "";
        main.style.height = "";
      }
      if (scroll) {
        scroll.style.height = prevScrollHeight || "";
        scroll.style.minHeight = "";
      }
    };
  }, []);

  const visibleDomains = mode === "admin" ? DOMAINS_MOCK : DOMAINS_MOCK.filter((d) => d.status === "active");
  const domain = DOMAINS_MOCK.find((d) => d.id === selectedId);

  const selectDomain = (id: string) => {
    setSelectedId(id);
    setActiveTab("vars");
  };

  const showToast = (msg: string, tone: "ok" | "warn" = "ok") => {
    setToast({ msg, tone });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="domains-surface">
      <div className="surface-header" style={{ borderBottom: "1px solid var(--line)", flexShrink: 0 }}>
        <div>
          <div className="crumbs">DATA TRANSLATION / DOMINIOS</div>
          <h1>Dominios del sistema</h1>
          <div className="sub">Catálogo de variables crediticias agrupadas en dominios. Cada dominio gestiona su propio ciclo de versiones.</div>
        </div>
        <div className="actions" style={{ alignItems: "center" }}>
          <div className="dom-mode-toggle">
            <button className={mode === "tenant" ? "active" : ""} onClick={() => setMode("tenant")}>
              Mi organización
            </button>
            <button className={mode === "admin" ? "active" : ""} onClick={() => setMode("admin")}>
              Admin Bowpi
            </button>
          </div>
        </div>
      </div>

      <div className="dom-body">
        <aside className="dom-list-panel">
          <div className="dom-list-label">Dominios · {visibleDomains.length}</div>
          <div className="dom-list-items">
            {visibleDomains.map((d) => (
              <div key={d.id} className={`dom-list-item ${d.id === selectedId ? "active" : ""}`} onClick={() => selectDomain(d.id)}>
                <div className="dom-list-item-top">
                  <span className="dom-id-pill">{d.id}</span>
                  <span className="dom-list-item-name">{d.name}</span>
                </div>
                <div className="dom-list-item-meta">
                  <span className={`dot ${domainStatusTone(d)}`} style={{ width: 6, height: 6, minWidth: 6, flexShrink: 0 }} />
                  <span>{domainStatusLabel(d)}</span>
                  {d.variableCount.total > 0 && (
                    <>
                      <span style={{ opacity: 0.35 }}>·</span>
                      <span>
                        {d.variableCount.s}S {d.variableCount.c}C
                      </span>
                    </>
                  )}
                  {d.activeVersion && (
                    <>
                      <span style={{ opacity: 0.35 }}>·</span>
                      <span>v{d.activeVersion}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {mode === "admin" && (
            <div className="dom-list-foot">
              <button className="btn sm" style={{ width: "100%" }} onClick={() => setSlideOpen("new-domain")}>
                <Icon.plus /> Nuevo dominio
              </button>
            </div>
          )}
        </aside>

        <div className="dom-content">
          {domain ? (
            <>
              <div className="dom-header">
                <div className="dom-header-info">
                  <div className="dom-header-top">
                    <span className="dom-id-badge">{domain.id}</span>
                    <span className="dom-header-name">{domain.name}</span>
                    <span className={`chip ${domainStatusTone(domain)}`}>
                      <span className={`dot ${domainStatusTone(domain)}`} />
                      {domainStatusLabel(domain)}
                    </span>
                    {domain.activeVersion && (
                      <span className="chip" style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.04em" }}>
                        v{domain.activeVersion}
                      </span>
                    )}
                  </div>
                  {domain.description && <div className="dom-header-desc">{domain.description}</div>}
                </div>
                <div className="dom-header-actions">
                  {mode === "admin" && (
                    <button className="btn sm ghost" title="Editar dominio (próximamente)" style={{ opacity: 0.4, cursor: "not-allowed" }}>
                      <Icon.cog />
                    </button>
                  )}
                </div>
              </div>

              <TabsFlush
                tabs={[
                  { value: "vars", label: "Variables", count: domain.variableCount.total },
                  { value: "versions", label: "Versiones" },
                ]}
                value={activeTab}
                onChange={(v) => setActiveTab(v as "vars" | "versions")}
                style={{ flexShrink: 0, marginBottom: 0, background: "var(--surface-1)", borderBottom: "1px solid var(--line)" }}
              />

              <div className="dom-tab-scroll">
                {activeTab === "vars" && <VarsTab domain={domain} mode={mode} onShowToast={showToast} />}
                {activeTab === "versions" && <VersionsTab domain={domain} mode={mode} onPublish={() => setSlideOpen("publish")} onShowToast={showToast} />}
              </div>
            </>
          ) : (
            <EmptyState icon={<Icon.data />} title="Selecciona un dominio" />
          )}
        </div>
      </div>

      {slideOpen === "publish" && domain && (
        <PublishVersionSlide
          domain={domain}
          onClose={() => setSlideOpen(null)}
          onSaved={(tag) => {
            setSlideOpen(null);
            showToast(`Versión "${tag}" publicada.`);
          }}
        />
      )}
      {slideOpen === "new-domain" && (
        <NewDomainSlide
          onClose={() => setSlideOpen(null)}
          onSaved={(name) => {
            setSlideOpen(null);
            showToast(`Dominio "${name}" creado en Draft.`);
          }}
        />
      )}

      {toast && (
        <div className={`save-toast ${toast.tone}`} style={{ animation: "m-fade-up 0.22s both" }}>
          {toast.tone === "ok" ? "✓" : "⚠"} {toast.msg}
        </div>
      )}
    </div>
  );
}
