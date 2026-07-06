import { Icon } from "../../icons/Icon";
import type { SavingState } from "../../types/matilda";

export interface SaveIndicatorProps {
  state: SavingState;
}

/** .save-indicator — inline saving/saved/error state, e.g. in mapper header. */
export function SaveIndicator({ state }: SaveIndicatorProps) {
  if (state === "idle") return null;
  return (
    <div className={`save-indicator ${state}`}>
      {state === "saving" && (
        <>
          <span className="spin">
            <Icon.refresh />
          </span>{" "}
          Guardando…
        </>
      )}
      {state === "saved" && (
        <>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7l3 3 5-6" />
          </svg>{" "}
          Guardado
        </>
      )}
      {state === "error" && <>✕ Error al guardar</>}
    </div>
  );
}
