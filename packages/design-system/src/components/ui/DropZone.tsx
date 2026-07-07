"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

export interface DropZoneProps {
  /** Icon displayed in the center (optional). */
  icon?: ReactNode;
  /** Primary label (e.g. "Arrastra tu JSON aquí"). */
  title: ReactNode;
  /** Secondary text (e.g. file format info). */
  description?: ReactNode;
  /** Accepted file types for the hidden input (e.g. ".json,.xml"). */
  accept?: string;
  /** Called when a file is selected or dropped. */
  onFile?: (file: File) => void;
  /** Disable interaction. */
  disabled?: boolean;
}

/** Drag-and-drop file upload zone. */
export function DropZone({ icon, title, description, accept, onFile, disabled }: DropZoneProps) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setOver(false);
      if (disabled) return;
      const file = e.dataTransfer.files?.[0];
      if (file) onFile?.(file);
    },
    [disabled, onFile]
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile?.(file);
    e.target.value = "";
  };

  return (
    <div
      className={`drop-zone ${over ? "over" : ""}`}
      onClick={handleClick}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      style={disabled ? { opacity: 0.5, pointerEvents: "none" } : undefined}
    >
      {icon && <div className="drop-zone-icon">{icon}</div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} style={{ display: "none" }} />
    </div>
  );
}
