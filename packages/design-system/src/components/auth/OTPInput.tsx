"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

export interface OTPInputProps {
  /** One entry per box, length must equal `length`. Use an array of "" to represent an empty box. */
  value: string[];
  onChange: (next: string[]) => void;
  length?: number;
}

/** .otp-row / .otp-box — 6-digit code input. Auto-advances, handles backspace and full-code paste. Controlled. */
export function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (i: number, raw: string) => {
    const v = raw.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[i] = v;
    onChange(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!txt) return;
    const next = txt.split("").concat(Array(length).fill("")).slice(0, length);
    onChange(next);
    refs.current[Math.min(txt.length, length - 1)]?.focus();
  };

  return (
    <div className="otp-row">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="otp-box"
          maxLength={1}
          inputMode="numeric"
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
