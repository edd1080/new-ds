"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthArt, AuthForm, AuthIcon, AuthLayout, AuthPanel, BtnFill, BtnGhostBack, FormInput, Icon } from "@bowpi/design-system";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated reset-link send — this prototype has no real backend.
    setTimeout(() => router.push("/check-email"), 500);
  };

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthForm onSubmit={handleSubmit}>
          <AuthIcon>
            <Icon.key />
          </AuthIcon>
          <div className="auth-head">
            <h1>¿Olvidaste tu contraseña?</h1>
            <p>Sin problema — te enviamos las instrucciones para restablecerla.</p>
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <FormInput id="email" type="email" placeholder="vos@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </div>
          <BtnFill disabled={submitting}>{submitting ? "Enviando…" : "Restablecer contraseña"}</BtnFill>
          <div style={{ textAlign: "center" }}>
            <BtnGhostBack onClick={() => router.push("/login")}>Volver a iniciar sesión</BtnGhostBack>
          </div>
        </AuthForm>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
