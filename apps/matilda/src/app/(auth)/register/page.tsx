"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthArt, AuthForm, AuthLayout, AuthPanel, BtnFill, BtnOutline, Divider, FormInput, Icon, PasswordField } from "@bowpi/design-system";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated account creation — this prototype has no real backend.
    setTimeout(() => router.push("/check-email"), 500);
  };

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthForm onSubmit={handleSubmit}>
          <div className="auth-head">
            <h1>Crear cuenta</h1>
            <p>Crea tu cuenta y empieza tu período de prueba.</p>
          </div>

          <div className="fields">
            <div className="field">
              <label htmlFor="name">Nombre completo</label>
              <FormInput id="name" type="text" placeholder="Juan Pérez" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="reg-email">Email laboral</label>
              <FormInput id="reg-email" type="email" placeholder="tu@empresa.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <PasswordField
              id="reg-password"
              label="Contraseña"
              placeholder="Mín. 8 caracteres"
              hint="Debe tener al menos 8 caracteres."
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              required
            />
          </div>

          <BtnFill disabled={submitting}>{submitting ? "Creando cuenta…" : "Crear cuenta"}</BtnFill>

          <Divider />

          <BtnOutline type="button">
            <Icon.google /> Registrarse con Google
          </BtnOutline>

          <p className="switch-p">
            ¿Ya tienes cuenta?{" "}
            <button type="button" className="auth-link" onClick={() => router.push("/login")}>
              Iniciar sesión
            </button>
          </p>
        </AuthForm>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
