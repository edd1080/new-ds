"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Icon,
  LockedSurface,
  Section4,
  MappingRow,
  TreePanel,
  PoliciesPanel,
  DestinationModal,
  ConfirmDialog,
  DomainPanel,
  SaveIndicator,
  SaveToast,
} from "@bowpi/design-system";
import type { RulePolicyV2 } from "@bowpi/design-system";
import { useMatildaStore } from "../../../store/useMatildaStore";
import { JSON_TREE_V4, CANONICAL_CATALOG, getCatalogItem } from "../../../data/mockData";

function MapperEditorInner() {
  const router = useRouter();

  const projectName = useMatildaStore((s) => s.projectName);
  const mapperId = useMatildaStore((s) => s.mapperId);
  const mappingRules = useMatildaStore((s) => s.mappingRules);
  const rulePolicies = useMatildaStore((s) => s.rulePolicies);
  const savingState = useMatildaStore((s) => s.savingState);
  const activeProject = useMatildaStore((s) => s.activeProject);
  const editorNeedsLoading = useMatildaStore((s) => s.editorNeedsLoading);
  const setDestination = useMatildaStore((s) => s.setDestination);
  const clearDestination = useMatildaStore((s) => s.clearDestination);
  const setPolicy = useMatildaStore((s) => s.setPolicy);
  const moveToMatched = useMatildaStore((s) => s.moveToMatched);
  const moveToNoMatch = useMatildaStore((s) => s.moveToNoMatch);
  const startSaving = useMatildaStore((s) => s.startSaving);
  const savedOk = useMatildaStore((s) => s.savedOk);
  const clearSave = useMatildaStore((s) => s.clearSave);
  const editorShown = useMatildaStore((s) => s.editorShown);

  const [editorPhase, setEditorPhase] = useState<"loading" | "ready">(editorNeedsLoading ? "loading" : "ready");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState<"all" | "matched" | "nomatch">("all");
  const [treeOpen, setTreeOpen] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; ruleId: string | null }>({ open: false, ruleId: null });
  const [toastVisible, setToastVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"mapping" | "domains">("mapping");
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    const el = document.querySelector<HTMLElement>(".main-scroll");
    if (el) {
      el.style.overflow = "hidden";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.height = "100%";
    }
    return () => {
      if (el) {
        el.style.overflow = "";
        el.style.display = "";
        el.style.flexDirection = "";
        el.style.height = "";
      }
    };
  }, []);

  const rules = mappingRules;
  const policies = rulePolicies as Record<string, RulePolicyV2>;

  const filtered = useMemo(() => {
    return rules.filter((r) => {
      if (sectionFilter === "matched" && r.category !== "matched") return false;
      if (sectionFilter === "nomatch" && r.category !== "noMatch") return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return r.sourcePath.toLowerCase().includes(q) || (r.destinationPath && r.destinationPath.toLowerCase().includes(q));
      }
      return true;
    });
  }, [rules, sectionFilter, search]);

  const matchedRules = useMemo(() => filtered.filter((r) => r.category === "matched"), [filtered]);
  const noMatchRules = useMemo(() => filtered.filter((r) => r.category === "noMatch"), [filtered]);
  const totalMatched = rules.filter((r) => r.category === "matched").length;
  const totalNoMatch = rules.filter((r) => r.category === "noMatch").length;

  const usedPaths = useMemo(() => {
    const set = new Set<string>();
    rules.forEach((r) => {
      if (r.destinationPath && r.id !== modal.ruleId) set.add(r.destinationPath);
    });
    return set;
  }, [rules, modal.ruleId]);

  const selectedRule = rules.find((r) => r.id === selectedId) || null;
  const selectedPolicy = selectedId ? policies[selectedId] ?? {} : {};
  const availablePaths = useMemo(() => [...new Set(rules.filter((r) => r.id !== selectedId).map((r) => r.sourcePath))], [rules, selectedId]);

  const handleSave = () => {
    startSaving();
    if (toastRef.current) clearTimeout(toastRef.current);
    setTimeout(() => {
      savedOk();
      setToastVisible(true);
      toastRef.current = setTimeout(() => {
        clearSave();
        setToastVisible(false);
      }, 3000);
    }, 1200);
  };

  useEffect(() => () => { if (toastRef.current) clearTimeout(toastRef.current); }, []);

  useEffect(() => {
    if (editorPhase === "loading") {
      const t = setTimeout(() => {
        editorShown();
        setEditorPhase("ready");
      }, 900);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorPhase]);

  const openModal = (ruleId: string) => setModal({ open: true, ruleId });
  const closeModal = () => setModal({ open: false, ruleId: null });

  const handleAssignDestination = (path: string) => {
    if (modal.ruleId) setDestination(modal.ruleId, path);
    closeModal();
  };

  const handleMoveToNoMatch = (id: string) => {
    moveToNoMatch(id);
    if (selectedId === id) setSelectedId(null);
  };

  if (editorPhase === "loading") {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, color: "var(--ink-4)" }}>
        <span className="spin" style={{ display: "inline-flex" }}>
          <Icon.refresh style={{ width: 24, height: 24 }} />
        </span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13.5, marginBottom: 5, color: "var(--ink-2)" }}>
            Cargando definición <span style={{ color: "var(--accent-ink)" }}>{mapperId}</span>…
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-5)" }}>Consultando el Mapper Service</div>
        </div>
      </div>
    );
  }

  const isSaving = savingState === "saving";
  const isSaved = savingState === "saved";
  const isError = savingState === "error";
  const isNewProject = !activeProject?.status;

  const modalRule = rules.find((r) => r.id === modal.ruleId);
  const selectedCatalogItem = selectedRule?.destinationPath ? getCatalogItem(selectedRule.destinationPath) : null;

  return (
    <div className="mapper4-surface">
      <div className="mapper4-header">
        <div className="hd-left">
          <div className="mapper-crumbs">DATA TRANSLATION / EDITOR</div>
          <h1>{projectName || "Definición sin nombre"}</h1>
          <div className="mapper-id-chip">
            ID: <span className="id-val">/{mapperId}</span>
            <span style={{ color: "var(--line-strong)" }}>·</span>
            <span>{rules.length} reglas</span>
          </div>
        </div>

        <div className="hd-tabs">
          <button className={`hd-tab ${activeTab === "mapping" ? "active" : ""}`} onClick={() => setActiveTab("mapping")}>
            Mapeo
          </button>
          <button className={`hd-tab ${activeTab === "domains" ? "active" : ""}`} onClick={() => setActiveTab("domains")}>
            Dominios
          </button>
        </div>

        <div className="hd-right">
          {isSaving && <SaveIndicator state="saving" />}
          {isSaved && <SaveIndicator state="saved" />}
          {isError && <SaveIndicator state="error" />}

          <button className="btn ghost sm" onClick={() => router.push("/projects")}>
            <Icon.arrow style={{ transform: "rotate(180deg)" }} /> Proyectos
          </button>

          <button className="btn primary" disabled={isSaving} onClick={handleSave} style={{ minWidth: 130 }}>
            {isSaving ? (
              <>
                <span className="spin">
                  <Icon.refresh />
                </span>{" "}
                Guardando…
              </>
            ) : isNewProject ? (
              <>
                <Icon.bolt /> Completar
              </>
            ) : (
              <>
                <Icon.shield /> Guardar
              </>
            )}
          </button>
        </div>
      </div>

      {activeTab === "domains" && <DomainPanel rules={rules} getCatalogItem={getCatalogItem} />}

      {activeTab === "mapping" && (
        <>
          <div className="mapper4-toolbar">
            <div className="mapper4-search">
              <Icon.search />
              <input placeholder="Buscar por campo origen o destino…" value={search} onChange={(e) => setSearch(e.target.value)} />
              {search && (
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 12 }} onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>

            <div className="mapper4-tabs">
              {(
                [
                  ["all", "Todas"],
                  ["matched", "Mapeadas"],
                  ["nomatch", "Sin mapear"],
                ] as const
              ).map(([v, l]) => (
                <button key={v} className={`mapper4-tab ${sectionFilter === v ? "active" : ""}`} onClick={() => setSectionFilter(v)}>
                  {l}
                </button>
              ))}
            </div>

            <div className="mapper4-stat">
              <span className="dot-matched" />
              <span>
                {totalMatched} mapeada{totalMatched !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="mapper4-stat">
              <span className="dot-nomatch" />
              <span>{totalNoMatch} sin mapear</span>
            </div>

            {filtered.length !== rules.length && <div style={{ fontSize: 12, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>{filtered.length} mostrados</div>}
          </div>

          <div className="mapper4-body">
            <TreePanel open={treeOpen} onToggle={() => setTreeOpen((o) => !o)} rules={rules} tree={JSON_TREE_V4} />

            <div className="rules-list">
              {filtered.length === 0 && (
                <div className="mapper4-empty" style={{ flex: 1 }}>
                  <Icon.search style={{ width: 28, height: 28 }} />
                  <h3>Sin resultados</h3>
                  <p>No hay reglas que coincidan con &quot;{search}&quot;. Intenta con otro término o cambia el filtro.</p>
                </div>
              )}

              {matchedRules.length > 0 && (
                <Section4 tone="matched" label="Mapeadas" count={matchedRules.length}>
                  {matchedRules.map((rule) => (
                    <MappingRow
                      key={rule.id}
                      rule={rule}
                      policy={policies[rule.id] || {}}
                      selected={selectedId === rule.id}
                      onSelect={setSelectedId}
                      onOpenModal={openModal}
                      onRequestRemove={(id) => setConfirmRemoveId(id)}
                      domainId={rule.destinationPath ? getCatalogItem(rule.destinationPath)?.domainId ?? null : null}
                    />
                  ))}
                </Section4>
              )}

              {noMatchRules.length > 0 && (
                <Section4 tone="nomatch" label="Sin mapear" count={noMatchRules.length}>
                  {noMatchRules.map((rule) => (
                    <MappingRow
                      key={rule.id}
                      rule={rule}
                      policy={policies[rule.id] || {}}
                      selected={selectedId === rule.id}
                      onSelect={setSelectedId}
                      onOpenModal={openModal}
                      onMoveToMatched={(id) => moveToMatched(id)}
                      onClearDestination={(id) => clearDestination(id)}
                      domainId={rule.destinationPath ? getCatalogItem(rule.destinationPath)?.domainId ?? null : null}
                    />
                  ))}
                </Section4>
              )}
            </div>

            <PoliciesPanel rule={selectedRule} policy={selectedPolicy} onSetPolicy={(pol) => selectedId && setPolicy(selectedId, pol)} catalogItem={selectedCatalogItem} availablePaths={availablePaths} />
          </div>
        </>
      )}

      {modal.open && (
        <DestinationModal
          sourcePath={modalRule?.sourcePath}
          currentPath={modalRule?.destinationPath || null}
          usedPaths={usedPaths}
          catalog={CANONICAL_CATALOG}
          onConfirm={handleAssignDestination}
          onClose={closeModal}
        />
      )}

      {confirmRemoveId && (
        <ConfirmDialog
          title="¿Remover del mapeo?"
          message="La regla se moverá a 'Sin mapear'. El destino canónico asignado se perderá."
          confirmLabel="Remover"
          confirmStyle="danger"
          onConfirm={() => {
            handleMoveToNoMatch(confirmRemoveId);
            setConfirmRemoveId(null);
          }}
          onClose={() => setConfirmRemoveId(null)}
        />
      )}

      {toastVisible && <SaveToast tone="ok" message="Guardado exitosamente" onDismiss={() => setToastVisible(false)} />}
    </div>
  );
}

export default function MapperPage() {
  const router = useRouter();
  const editorState = useMatildaStore((s) => s.editorState);
  const mapperId = useMatildaStore((s) => s.mapperId);
  const agentDone = useMatildaStore((s) => s.agentDone);
  const configDone = useMatildaStore((s) => s.configDone);
  const mappingRules = useMatildaStore((s) => s.mappingRules);

  if (editorState === "notFound") {
    return (
      <div className="surf-empty">
        <div className="ic-wrap">
          <Icon.flow />
        </div>
        <h2>Definición no encontrada</h2>
        <p>
          La definición <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink-2)" }}>{mapperId}</span> no existe en el Mapper Service.
        </p>
        <div className="actions">
          <button className="btn primary lg" onClick={() => router.push("/projects")}>
            <Icon.arrow style={{ transform: "rotate(180deg)" }} /> Volver a definiciones
          </button>
        </div>
      </div>
    );
  }

  if (!agentDone || mappingRules.length === 0) {
    return (
      <LockedSurface
        heading="Primero completa la ingesta"
        body="El editor se activa después de cargar el JSON del cliente y ejecutar el análisis del agente."
        icon={<Icon.flow />}
        steps={[
          { label: "Configuración", state: configDone ? "done" : "now" },
          { label: "Ingesta de datos", state: configDone ? "now" : "pending" },
          { label: "Editor de mapeo", state: "pending" },
        ]}
        cta="Ir a configuración"
        onCta={() => router.push("/upload")}
      />
    );
  }

  return <MapperEditorInner />;
}
