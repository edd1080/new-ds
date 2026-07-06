import type { ChangeEvent } from "react";
import { Icon } from "../../icons/Icon";

export interface SimUploadZoneProps {
  label: string;
  sub: string;
  accept?: string;
  onFile: (file: File) => void;
}

/** .sim-upload-zone — dashed drop-style file picker (DMN / JSON / CSV uploads). */
export function SimUploadZone({ label, sub, accept, onFile }: SimUploadZoneProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  };
  return (
    <label className="sim-upload-zone" style={{ cursor: "pointer" }}>
      <span className="ico">
        <Icon.upload width={20} height={20} />
      </span>
      <span className="lbl">{label}</span>
      <span className="sub">{sub}</span>
      <input type="file" accept={accept} onChange={handleChange} style={{ display: "none" }} />
    </label>
  );
}
