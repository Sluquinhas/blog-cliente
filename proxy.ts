import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "./lib/session-token";

// Next.js 16: "Proxy" substitui o antigo Middleware (mesma funcionalidade).
// Aqui fazemos apenas uma checagem OTIMISTA: pré-filtramos visitantes sem
// sessão antes que cheguem ao painel. A autorização real é reforçada no
// servidor (DAL `verifySession` nas páginas e Server Actions de escrita).
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // A página de login precisa ficar acessível sem sessão.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    const url = new URL("/admin/login", req.nextUrl);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
