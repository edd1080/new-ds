"use client";

import { useRouter } from "next/navigation";
import { AuthArt, AuthCenter, AuthIcon, AuthLayout, AuthPanel, BtnFill, Icon } from "@bowpi/design-system";

export default function EmailVerifiedPage() {
  const router = useRouter();

  return (
    <AuthLayout>
      <AuthPanel>
        <AuthCenter>
          <AuthIcon ok>
            <Icon.checkCircle />
          </AuthIcon>
          <h1>Email verificado</h1>
          <p>Tu email fue verificado correctamente. Ya podés iniciar sesión.</p>
          <BtnFill type="button" style={{ width: "100%" }} onClick={() => router.push("/login")}>
            Continuar a iniciar sesión
          </BtnFill>
        </AuthCenter>
      </AuthPanel>
      <AuthArt />
    </AuthLayout>
  );
}
