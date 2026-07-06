"use client";

import { useState, type ChangeEvent } from "react";
import { FormInput } from "../ui/FormInput";
import { Icon } from "../../icons/Icon";

export interface PasswordFieldProps {
  id?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  hint?: string;
  autoComplete?: string;
  required?: boolean;
}

/** .pw-wrap / .pw-eye — password input with a show/hide toggle. Controlled. */
export function PasswordField({ id, label, placeholder, value, onChange, hasError, hint, autoComplete, required }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="pw-wrap">
        <FormInput
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          hasError={hasError}
          autoComplete={autoComplete}
          required={required}
        />
        <button type="button" className="pw-eye" onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>
          {show ? <Icon.eyeOff /> : <Icon.eye />}
        </button>
      </div>
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}
