"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Shell, Icon, type SidebarNavGroup } from "@bowpi/design-system";
import { useMatildaStore } from "../../store/useMatildaStore";
import { DT_STEPS } from "../../data/mockData";

function getStepState(hasProject: boolean, configDone: boolean, agentDone: boolean, i: number): "done" | "active" | "locked" {
  if (!hasProject) return "locked";
  if (i === 0) return configDone ? "done" : "active";
  if (i === 1) {
    if (agentDone) return "done";
    if (configDone) return "active";
    return "locked";
  }
  if (i === 2) return agentDone ? "active" : "locked";
  return "locked";
}

/** Maps a URL pathname (/overview, /mapper, ...) to the Shell's activeId ("overview", "mapper", ...). */
function surfaceFromPath(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg || "overview";
}

export function AppShellClient({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const activeId = surfaceFromPath(pathname);

  const theme = useMatildaStore((s) => s.theme);
  const seenExplainer = useMatildaStore((s) => s.seenExplainer);
  const activeProject = useMatildaStore((s) => s.activeProject);
  const mapperId = useMatildaStore((s) => s.mapperId);
  const configDone = useMatildaStore((s) => s.configDone);
  const agentDone = useMatildaStore((s) => s.agentDone);
  const setTheme = useMatildaStore((s) => s.setTheme);
  const reset = useMatildaStore((s) => s.reset);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const navGroups: SidebarNavGroup[] = [
    { items: [{ id: "overview", name: "Overview", icon: <Icon.layers /> }] },
    {
      label: "Empezar",
      items: [{ id: "explainer", name: "Cómo funciona", icon: <Icon.book />, hint: !seenExplainer ? "nuevo" : null }],
    },
    {
      label: "Data Translation",
      items: [
        { id: "projects", name: "Proyectos", icon: <Icon.cards /> },
        { id: "domains", name: "Dominios", icon: <Icon.data /> },
        { id: "simulations", name: "Simulaciones", icon: <Icon.schedule />, hint: "nuevo" },
      ],
    },
  ];

  const activeProjectStepper = activeProject
    ? {
        projectName: activeProject.name,
        steps: DT_STEPS.map((step, i) => ({
          label: step.label,
          state: getStepState(true, configDone, agentDone, i),
          onClick: () => router.push(`/${step.surface}`),
        })),
      }
    : null;

  return (
    <Shell
      activeId={activeId}
      navGroups={navGroups}
      onNavigate={(id) => router.push(`/${id}`)}
      activeProjectStepper={activeProjectStepper}
      theme={theme}
      onThemeChange={setTheme}
      onReset={reset}
      onOpenSettings={() => router.push("/settings")}
      userName="Jonatán Fernández"
      userRole="Implementación"
      userInitials="JF"
      tenant="bs.prod"
      mapperId={mapperId}
      version="v4.5"
    >
      {children}
    </Shell>
  );
}
