"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MatildaState, MatildaActions } from "@bowpi/design-system";
import { structuredDataToRules } from "../lib/helpers";
import { MOCK_STRUCTURED_DATA } from "../data/mockData";

/** localStorage key — kept as matilda_v4_store for compatibility (cursor_handoff/AGENTS.md §5). */
const STORE_KEY = "matilda_v4_store";

const INITIAL: MatildaState = {
  theme: "light",
  seenExplainer: false,
  activeProject: null,
  mapperId: null,
  projectName: null,
  configDone: false,
  jsonLoaded: false,
  agentDone: false,
  mappingRules: [],
  rulePolicies: {},
  savingState: "idle",
  rulesConfirmed: false,
  summaryOk: false,
  published: false,
  publishedVersion: null,
  blockerResolved: false,
  editorNeedsLoading: false,
  editorState: "idle",
};

export type MatildaStore = MatildaState & MatildaActions;

export const useMatildaStore = create<MatildaStore>()(
  persist(
    (set) => ({
      ...INITIAL,

      setTheme: (theme) => set({ theme }),
      markExplainerSeen: () => set({ seenExplainer: true }),

      setConfig: (mapperId, projectName) =>
        set({
          mapperId,
          projectName,
          configDone: true,
          activeProject: { id: mapperId, name: projectName, source: null, status: "analysis", mapperId, rules: 0, coverage: 0, updated: "—", client: "" },
        }),

      setProject: (project) => {
        if (project.status === "notFound") {
          set({
            activeProject: project,
            mapperId: project.mapperId || project.id,
            projectName: project.name,
            configDone: false,
            jsonLoaded: false,
            agentDone: false,
            mappingRules: [],
            rulePolicies: {},
            savingState: "idle",
            editorState: "notFound",
            editorNeedsLoading: false,
          });
          return;
        }
        const hasRules = project.rules > 0;
        const rules = hasRules ? structuredDataToRules(MOCK_STRUCTURED_DATA) : [];
        set({
          activeProject: project,
          mapperId: project.mapperId || project.id,
          projectName: project.name,
          configDone: true,
          jsonLoaded: hasRules,
          agentDone: hasRules,
          mappingRules: rules,
          rulePolicies: {},
          savingState: "idle",
          rulesConfirmed: project.status === "published" || project.status === "draft",
          summaryOk: project.status === "published",
          published: project.status === "published",
          publishedVersion: project.status === "published" ? `${project.mapperId}.1.0` : null,
          blockerResolved: false,
          editorNeedsLoading: hasRules,
          editorState: "idle",
        });
      },

      loadJson: () => set({ jsonLoaded: true }),
      runAgent: () => set({ agentDone: true }),

      setRules: (rules) => set({ mappingRules: rules }),

      moveToMatched: (id) =>
        set((s) => ({ mappingRules: s.mappingRules.map((r) => (r.id === id ? { ...r, category: "matched" } : r)) })),

      moveToNoMatch: (id) =>
        set((s) => ({
          mappingRules: s.mappingRules.map((r) => (r.id === id ? { ...r, category: "noMatch", destinationPath: null } : r)),
        })),

      setDestination: (id, path) =>
        set((s) => ({ mappingRules: s.mappingRules.map((r) => (r.id === id ? { ...r, destinationPath: path } : r)) })),

      clearDestination: (id) =>
        set((s) => ({ mappingRules: s.mappingRules.map((r) => (r.id === id ? { ...r, destinationPath: null } : r)) })),

      setPolicy: (id, policy) =>
        set((s) => ({ rulePolicies: { ...s.rulePolicies, [id]: { ...(s.rulePolicies[id] || {}), ...policy } } })),

      startSaving: () => set({ savingState: "saving" }),
      savedOk: () => set({ savingState: "saved" }),
      savedError: () => set({ savingState: "error" }),
      clearSave: () => set({ savingState: "idle" }),

      confirmRules: () => set({ rulesConfirmed: true }),
      markSummaryOk: () => set({ summaryOk: true }),
      resolveBlocker: () => set({ blockerResolved: true }),
      publish: (version) => set({ published: true, publishedVersion: version }),
      editorShown: () => set({ editorNeedsLoading: false, editorState: "idle" }),

      reset: () =>
        set((s) => ({ ...INITIAL, theme: s.theme, seenExplainer: s.seenExplainer })),
    }),
    {
      name: STORE_KEY,
      // Persist only state, not action functions.
      partialize: (s): MatildaState => ({
        theme: s.theme,
        seenExplainer: s.seenExplainer,
        activeProject: s.activeProject,
        mapperId: s.mapperId,
        projectName: s.projectName,
        configDone: s.configDone,
        jsonLoaded: s.jsonLoaded,
        agentDone: s.agentDone,
        mappingRules: s.mappingRules,
        rulePolicies: s.rulePolicies,
        savingState: s.savingState,
        rulesConfirmed: s.rulesConfirmed,
        summaryOk: s.summaryOk,
        published: s.published,
        publishedVersion: s.publishedVersion,
        blockerResolved: s.blockerResolved,
        editorNeedsLoading: s.editorNeedsLoading,
        editorState: s.editorState,
      }),
    }
  )
);
