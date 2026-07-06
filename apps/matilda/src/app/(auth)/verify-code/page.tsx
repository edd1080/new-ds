"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthArt, AuthCenter, AuthIcon, AuthLayout, AuthPanel, BtnFill, BtnGhostBack, Icon, OTPInput } from "@bowpi/design-system";

export default function VerifyCodePage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [resent, setResent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated verification — this prototype has no real backend.
    setTimeout(() => router.push("/email-verified"), 500);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 2500);
  };

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthCenter onSubmit={handleSubmit}>
          <AuthIcon>
            <Icon.mail />
          </AuthIcon>
          <h1>Ingresá el código</h1>
          <p>
            Ingresá el código de 6 dígitos que enviamos a <strong style={{ color: "var(--ink-2)" }}>olivia@empresa.com</strong>
          </p>
          <OTPInput value={code} onChange={setCode} />
          <BtnFill style={{ width: "100%", marginTop: 4 }} disabled={submitting}>
            {submitting ? "Verificando…" : "Verificar email"}
          </BtnFill>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)" }}>
            ¿No lo recibiste?{" "}
            <button type="button" className="auth-link" onClick={handleResend}>
              {resent ? "Reenviado" : "Reenviar"}
            </button>
          </p>
          <BtnGhostBack onClick={() => router.push("/login")}>Volver a iniciar sesión</BtnGhostBack>
        </AuthCenter>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
