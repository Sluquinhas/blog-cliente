import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionCookie } from "./session";
import { verifySessionToken, type SessionPayload } from "./session-token";

// Lê e valida a sessão atual a partir do cookie. Memoizado por render.
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = await getSessionCookie();
  return verifySessionToken(token);
});

// Exige uma sessão válida; redireciona para o login caso contrário.
// Use em páginas /admin, Server Actions de escrita e Route Handlers protegidos.
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
});
