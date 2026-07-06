"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthArt, AuthCenter, AuthIcon, AuthLayout, AuthPanel, BtnFill, BtnGhostBack, Icon, OTPInput } from "@bowpi/design-system";

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated 2FA check — successful login lands on the main app entry point.
    setTimeout(() => router.push("/overview"), 500);
  };

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthCenter onSubmit={handleSubmit}>
          <AuthIcon>
            <Icon.shield />
          </AuthIcon>
          <h1>Verificación en dos pasos</h1>
          <p>Ingresá el código de 6 dígitos de tu app de autenticación para autorizar el acceso.</p>
          <OTPInput value={code} onChange={setCode} />
          <BtnFill style={{ width: "100%", marginTop: 4 }} disabled={submitting}>
            {submitting ? "Autorizando…" : "Autorizar acceso"}
          </BtnFill>
          <p style={{ fontSize: 13, color: "var(--ink-4)" }}>
            ¿Perdiste el acceso?{" "}
            <button type="button" className="auth-link">
              Usar código de recuperación
            </button>
          </p>
          <BtnGhostBack onClick={() => router.push("/login")}>Cancelar</BtnGhostBack>
        </AuthCenter>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
