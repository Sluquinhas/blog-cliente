"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../../lib/session";

export type LoginState = { erro?: string } | undefined;

// Comparação de senha em tempo constante.
function senhaConfere(input: string): boolean {
  const senha = process.env.ADMIN_PASSWORD ?? "";
  if (!senha) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(senha);

  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Server Action de login (compatível com useActionState).
export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const senha = String(formData.get("senha") ?? "");

  if (!senhaConfere(senha)) {
    return { erro: "Senha incorreta." };
  }

  await createSession();
  redirect("/admin");
}

// Server Action de logout.
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
