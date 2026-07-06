/** Viewer mode for the Dominios surface — admin has full CRUD, tenant is read-mostly. */
export type DomainMode = "admin" | "tenant";

export interface ToastState {
  msg: string;
  tone: "ok" | "warn";
}

export interface ConfirmState {
  title: string;
  message: string;
  confirmLabel: string;
  confirmStyle?: "danger";
  onConfirm: () => void;
}
