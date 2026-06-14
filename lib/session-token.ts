import crypto from "node:crypto";

// Nome do cookie de sessão do painel administrativo.
export const SESSION_COOKIE_NAME = "padilha_session";

// Duração da sessão: 7 dias.
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionPayload = {
  userId: string;
  exp: number; // expiração em segundos (epoch)
};

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET ausente ou muito curto. Defina-o no .env (gere com `openssl rand -base64 32`)."
    );
  }

  return secret;
}

function base64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

// Gera um token assinado (HMAC-SHA256) no formato `payload.assinatura`.
export function signToken(payload: SessionPayload): string {
  const data = base64url(JSON.stringify(payload));

  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("base64url");

  return `${data}.${sig}`;
}

// Verifica a assinatura e a expiração; devolve o payload ou null.
export function verifySessionToken(
  token: string | undefined | null
): SessionPayload | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [data, sig] = parts;

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);

  // Comparação em tempo constante para evitar timing attacks.
  if (
    sigBuf.length !== expBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expBuf)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString()
    ) as SessionPayload;

    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
