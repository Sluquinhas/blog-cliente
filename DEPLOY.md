# Deploy — Blog "Economista Raimundo Padilha" (VPS Hostinger)

Guia passo a passo para publicar o blog num **VPS Hostinger (Ubuntu)** com **disco
persistente**, mantendo **SQLite** como banco. Como o ambiente não é serverless, o SQLite
local é a escolha correta — não há necessidade de trocar de banco.

**Caminho recomendado:** Node + **PM2** + **Nginx** (reverse proxy) + **Certbot** (HTTPS).
É o mais simples para um único VPS: acesso direto ao arquivo `.db` no disco, backup trivial
por cron, e `next start` "suporta todos os recursos do Next" (inclusive otimização de imagem
com `sharp`, que já é dependência transitiva). Uma alternativa em **Docker** está ao final.

---

## 0. Visão geral dos caminhos

```
/var/www/padilha-blog        → código da aplicação (releases)
/var/lib/padilha-blog/prod.db→ banco SQLite (disco PERSISTENTE, fora das releases)
/var/backups/padilha-blog    → backups automáticos do .db
```

---

## 1. Pré-requisitos no servidor (Ubuntu)

```bash
# Node 22 LTS (via nodesource) e ferramentas para compilar o better-sqlite3 (módulo nativo)
sudo apt-get update
sudo apt-get install -y curl git build-essential python3 nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 (gerenciador de processos)
sudo npm install -g pm2

node -v   # deve mostrar v22.x
```

## 2. Obter o código

```bash
sudo mkdir -p /var/www/padilha-blog /var/lib/padilha-blog /var/backups/padilha-blog
sudo chown -R "$USER" /var/www/padilha-blog /var/lib/padilha-blog /var/backups/padilha-blog

cd /var/www/padilha-blog
git clone <URL_DO_REPOSITORIO> .
# (ou envie os arquivos via scp/rsync — NÃO envie node_modules, .next nem o dev.db)
```

## 3. Variáveis de ambiente

Crie o arquivo `.env` na raiz (`/var/www/padilha-blog/.env`) a partir do `.env.example`:

```bash
cp .env.example .env
nano .env
```

Preencha:

```bash
DATABASE_URL="file:/var/lib/padilha-blog/prod.db"   # disco persistente, caminho ABSOLUTO
ADMIN_PASSWORD="<senha-forte-do-painel>"
SESSION_SECRET="$(openssl rand -base64 32)"          # cole o valor gerado
NEXT_PUBLIC_SITE_URL="https://padilha.com.br"
NODE_ENV="production"
```

> ⚠️ `NEXT_PUBLIC_SITE_URL` é embutido no build — defina-o **antes** de rodar `npm run build`.
> O `.env` nunca deve ser versionado (já está no `.gitignore`).

## 4. Instalar, migrar, popular e buildar

A ordem importa: o banco precisa existir e estar populado **antes** do build, pois a home e a
lista de artigos são pré-renderizadas com o conteúdo do banco.

```bash
cd /var/www/padilha-blog

npm ci                       # instala deps (postinstall roda `prisma generate`)
npx prisma migrate deploy    # cria/atualiza o schema no prod.db
npm run seed                 # popula os 6 artigos iniciais (idempotente; só na 1ª vez)
npm run build                # prisma generate + next build
```

> Em deploys seguintes (atualização de código), repita `npm ci`, `npx prisma migrate deploy`
> e `npm run build`. **Não** rode o seed de novo a menos que queira reinserir os artigos
> iniciais (ele é idempotente por slug e não apaga o conteúdo criado pelo painel).

## 5. Subir com PM2

```bash
cd /var/www/padilha-blog
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # siga a instrução exibida para iniciar no boot
pm2 logs padilha-blog   # acompanhar logs
```

A aplicação ficará escutando em `http://127.0.0.1:3000`.

## 6. Nginx como reverse proxy

Crie `/etc/nginx/sites-available/padilha-blog`:

```nginx
server {
    listen 80;
    server_name padilha.com.br www.padilha.com.br;

    # Limite de upload de formulários (inclui a foto de capa do artigo, até 5 MB)
    client_max_body_size 6m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
        # Não bufferizar respostas em streaming do Next
        proxy_buffering off;
        proxy_set_header X-Accel-Buffering no;
    }
}
```

Ative e recarregue:

```bash
sudo ln -s /etc/nginx/sites-available/padilha-blog /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 7. HTTPS com Certbot (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d padilha.com.br -d www.padilha.com.br
# Certbot ajusta o Nginx para 443 e configura a renovação automática.
sudo certbot renew --dry-run   # testar renovação
```

## 8. Backup automático do SQLite

Crie `/usr/local/bin/backup-padilha-blog.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="/var/lib/padilha-blog/prod.db"
DEST_DIR="/var/backups/padilha-blog"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEST_DIR"
# .backup garante uma cópia consistente mesmo com a app rodando
sqlite3 "$SRC" ".backup '$DEST_DIR/prod-$STAMP.db'"
# Mantém apenas os últimos 14 backups
ls -1t "$DEST_DIR"/prod-*.db | tail -n +15 | xargs -r rm --
```

```bash
sudo apt-get install -y sqlite3
sudo chmod +x /usr/local/bin/backup-padilha-blog.sh
# Agendar diariamente às 03:00 no cron do root:
echo "0 3 * * * /usr/local/bin/backup-padilha-blog.sh" | sudo tee /etc/cron.d/padilha-blog-backup
```

## 9. Atualizações futuras (resumo)

```bash
cd /var/www/padilha-blog
git pull
npm ci
npx prisma migrate deploy
npm run build
pm2 reload padilha-blog
```

---

## ✅ Checklist final de "pronto para produção"

- [ ] `.env` preenchido com `ADMIN_PASSWORD` e `SESSION_SECRET` fortes; `DATABASE_URL`
      apontando para `/var/lib/padilha-blog/prod.db`; `NEXT_PUBLIC_SITE_URL=https://padilha.com.br`.
- [ ] `npx prisma migrate deploy` executado; `prod.db` criado no disco persistente com
      permissão de escrita para o usuário do processo.
- [ ] `npm run seed` executado na primeira publicação (artigos iniciais aparecem).
- [ ] `npm run build` concluído sem erros (rodado **após** o seed).
- [ ] PM2 rodando (`pm2 status`) e configurado para iniciar no boot (`pm2 save && pm2 startup`).
- [ ] Nginx encaminhando para a porta 3000; `nginx -t` OK.
- [ ] HTTPS ativo via Certbot; redirecionamento http→https funcionando.
- [ ] Backup do `.db` agendado no cron e testado.
- [ ] `/admin` redireciona para `/admin/login` sem sessão; login funciona; criar/editar/excluir
      reflete no site sem rebuild.
- [ ] `/robots.txt` e `/sitemap.xml` acessíveis; `/admin` bloqueado no robots.
- [ ] Nenhum segredo nem `dev.db` versionado no repositório.

---

## Alternativa: Docker (opcional)

Se preferir conteinerizar, use `output: "standalone"` no `next.config.ts` e um Dockerfile
multi-stage, montando o banco como **volume** para persistência:

```dockerfile
# Dockerfile (esboço)
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y python3 build-essential && npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_SITE_URL=https://padilha.com.br
RUN npx prisma generate && npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
# O banco vive num volume persistente, fora da imagem:
docker run -d --name padilha-blog -p 3000:3000 \
  -e DATABASE_URL="file:/data/prod.db" \
  -e ADMIN_PASSWORD="..." -e SESSION_SECRET="..." \
  -e NEXT_PUBLIC_SITE_URL="https://padilha.com.br" \
  -v /var/lib/padilha-blog:/data \
  padilha-blog
# Rodar migrate/seed dentro do container na primeira vez:
docker exec -it padilha-blog npx prisma migrate deploy
docker exec -it padilha-blog npm run seed
```

> Para o caminho Docker é necessário adicionar `output: "standalone"` ao `next.config.ts`.
> O caminho **PM2** acima é o recomendado por ser mais simples de operar e fazer backup num
> único VPS.
