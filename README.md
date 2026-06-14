# Blog — Economista Raimundo Padilha

Blog de **economia, mercado financeiro e investimentos** de Raimundo Padilha, à frente da
**Padilha Participações** (assessoria de investimentos, Fortaleza/CE). Inclui um painel
administrativo protegido por senha para publicar e gerenciar os artigos.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS 4**
- **Prisma 7** sobre **SQLite** (adapter `@prisma/adapter-better-sqlite3`)
- Autenticação própria por cookie assinado (HMAC via `node:crypto`, sem dependências externas)

## Pré-requisitos

- Node.js 22+
- Em Linux, ferramentas de build para compilar o `better-sqlite3`
  (`build-essential` + `python3`).

## Como rodar localmente

```bash
# 1. Variáveis de ambiente
cp .env.example .env        # ajuste ADMIN_PASSWORD e SESSION_SECRET

# 2. Dependências (o postinstall roda `prisma generate`)
npm install

# 3. Banco: aplicar a migration e popular com artigos de exemplo
npx prisma migrate deploy
npm run seed

# 4. Desenvolvimento
npm run dev                 # http://localhost:3000
```

## Scripts

| Script            | Descrição                                            |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento                          |
| `npm run build`   | `prisma generate` + build de produção                |
| `npm run start`   | Servidor de produção (após o build)                  |
| `npm run lint`    | ESLint                                               |
| `npm run seed`    | Popula o banco com os artigos iniciais (idempotente) |

## Painel administrativo

- Acesse `/admin` (redireciona para `/admin/login` se você não estiver autenticado).
- A senha é a definida em `ADMIN_PASSWORD` no `.env`.
- Permite criar, editar, visualizar e excluir artigos. A **capa** de cada artigo é informada
  por **URL**; se ficar em branco, uma capa padrão sóbria é usada.

## Variáveis de ambiente

Veja `.env.example`. Resumo:

- `DATABASE_URL` — caminho do SQLite (ex.: `file:./dev.db` em dev; caminho absoluto em
  disco persistente em produção).
- `ADMIN_PASSWORD` — senha única do painel.
- `SESSION_SECRET` — segredo para assinar o cookie de sessão (`openssl rand -base64 32`).
- `NEXT_PUBLIC_SITE_URL` — URL pública (usada em metadata, canonical, sitemap e OG).

## Estrutura (resumo)

```
app/
  page.tsx                 Home
  artigos/                 Lista e página do artigo ([slug])
  sobre/  contato/         Páginas institucionais
  admin/                   Painel (login, novo, editar, visualizar)
  actions/                 Server Actions (artigos, auth)
  components/              Navbar, Footer, ArticleCard, Capa, ThemeToggle
  sitemap.ts  robots.ts    SEO
  opengraph-image.tsx  icon.svg
lib/                       prisma, session, session-token, dal
prisma/                    schema.prisma, migrations, seed.mjs
proxy.ts                   Checagem otimista de sessão para /admin (Next 16 "Proxy")
public/capas/              Capas SVG próprias
```

## Deploy

Consulte o **[DEPLOY.md](./DEPLOY.md)** — guia completo para VPS Hostinger (Ubuntu) com
Node + PM2 + Nginx + Certbot, banco em disco persistente e backup automático.
