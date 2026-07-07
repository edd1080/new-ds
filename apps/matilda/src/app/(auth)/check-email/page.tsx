"use client";

import { useRouter } from "next/navigation";
import { AuthArt, AuthCenter, AuthIcon, AuthLayout, AuthPanel, BtnFill, BtnGhostBack, Icon } from "@bowpi/design-system";

export default function CheckEmailPage() {
  const router = useRouter();

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthCenter>
          <AuthIcon>
            <Icon.mail />
          </AuthIcon>
          <h1>Revisa tu email</h1>
          <p>
            Enviamos un link de verificación a <strong style={{ color: "var(--ink-2)" }}>olivia@empresa.com</strong>
          </p>
          <BtnFill type="button" style={{ width: "100%" }} onClick={() => router.push("/verify-code")}>
            Ingresar código manualmente
          </BtnFill>
          <BtnGhostBack onClick={() => router.push("/login")}>Volver a iniciar sesión</BtnGhostBack>
        </AuthCenter>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
