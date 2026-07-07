"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthArt, AuthForm, AuthLayout, AuthPanel, BtnFill, BtnOutline, Checkbox, Divider, FormInput, Icon, PasswordField } from "@bowpi/design-system";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated auth call — this prototype has no real backend.
    setTimeout(() => router.push("/two-factor"), 500);
  };

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthForm onSubmit={handleSubmit}>
          <div className="auth-head">
            <h1>Iniciar sesión</h1>
            <p>Bienvenido de vuelta — ingresa tus credenciales para continuar.</p>
          </div>

          <div className="fields">
            <div className="field">
              <label htmlFor="email">Email</label>
              <FormInput id="email" type="email" placeholder="tu@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <PasswordField id="password" label="Contraseña" placeholder="Ingresa tu contraseña" value={password} onChange={setPassword} autoComplete="current-password" required />
          </div>

          <div className="row-between">
            <Checkbox checked={remember} onChange={setRemember} label="Recordarme por 30 días" />
            <button type="button" className="auth-link" onClick={() => router.push("/forgot-password")}>
              Olvidé mi contraseña
            </button>
          </div>

          <BtnFill disabled={submitting}>{submitting ? "Ingresando…" : "Iniciar sesión"}</BtnFill>

          <Divider />

          <BtnOutline type="button">
            <Icon.google /> Continuar con Google
          </BtnOutline>

          <p className="switch-p">
            ¿No tienes cuenta?{" "}
            <button type="button" className="auth-link" onClick={() => router.push("/register")}>
              Crear cuenta
            </button>
          </p>
        </AuthForm>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
