# Deploy — Blog "Economista Raimundo Padilha" (Hostinger Shared Hosting)

Arquitetura de produção **atualizada** em 17/07/2026. O blog roda num plano de
**shared hosting da Hostinger** — Node.js 22 (via alt-nodejs) com Next.js em
modo `standalone`, mantido vivo por cron a cada 5 min. **Não é VPS.** Documentos
antigos que descreviam PM2 + Nginx + Certbot foram substituídos por este.

---

## Visão geral

```
Host:   Hostinger Shared (u275149467@212.85.6.130:65002)
Runtime: Node.js 22 (fallback pra 20) via /opt/alt/alt-nodejs22/root/usr/bin/node
Porta:  3003 (bind em 127.0.0.1, proxy via .htaccess/api-proxy.php no public_html)

Estrutura no server:
  ~/domains/raimundopadilha.com.br/
    ├── blog-padilha/                 → código Next.js standalone (server.js)
    │   ├── .env                       → credenciais (nunca commitar)
    │   ├── db/                        → SQLite (prod.db)
    │   ├── server.js                  → entrypoint standalone
    │   └── start-server.sh            → boot script (chamado pelo cron)
    ├── public_html/                   → onde o domínio aponta
    │   ├── .htaccess                  → rewrite pro proxy
    │   └── api-proxy.php              → forward pra porta 3003
    ├── blog-padilha-server.log        → stdout/stderr do Node
    ├── blog-padilha-server.pid        → PID do processo ativo
    └── blog-padilha-cron.log          → log do cron watchdog
```

**Cron watchdog** (rodando a cada 5 min):
```
*/5 * * * * bash ~/domains/raimundopadilha.com.br/blog-padilha/start-server.sh >> ~/domains/raimundopadilha.com.br/blog-padilha-cron.log 2>&1
```

O `start-server.sh` faz 3 coisas:
1. Se o processo já está rodando **e** o `server.js` **não** foi atualizado depois do PID, sai (no-op).
2. Se o `server.js` é **mais recente** que o PID (sinal de que houve deploy), **mata o PID e reinicia** — é o mecanismo de auto-restart pós-deploy via FTP.
3. Se o processo não está rodando, inicia.

---

## Dois caminhos de deploy

### Caminho A: Deploy via SSH (dono do projeto)

Usado por quem tem SSH direto na conta `u275149467`.

```bash
bash deploy.sh
```

Faz: build local → empacota → `scp` pro server → extrai em `~/domains/raimundopadilha.com.br/blog-padilha/` → mata Node antigo → reinicia com `start-server.sh`.

Requer: chave SSH configurada pra `u275149467@212.85.6.130` (porta 65002).

### Caminho B: Deploy via FTP (colaboradores sem SSH)

Usado por colaboradores externos que só têm acesso FTP dedicado (não SSH da conta principal).

```bash
bash deploy-ftp.sh
```

Faz: build local → empacota bundle standalone → upload via `lftp` pra `/blog-padilha/` (dentro do FTP chrootado) → o cron do server detecta código novo e reinicia o Node em até 5 min.

**Pré-requisitos** (Linux/Mac/WSL):
```bash
# Instalar lftp
sudo apt install lftp   # Ubuntu/Debian
brew install lftp        # Mac

# Criar .env.ftp na raiz do repo (NÃO commitar, já está no .gitignore)
cat > .env.ftp <<EOF
FTP_HOST=ftp.raimundopadilha.com.br
FTP_USER=<seu-user-ftp>
FTP_PASS=<sua-senha-ftp>
EOF
```

O escopo do usuário FTP é **chrootado** em `/home/u275149467/domains/raimundopadilha.com.br/` — ele só vê o próprio domínio, não os outros projetos da conta.

---

## Setup inicial no server (histórico — já foi feito)

Deixado aqui pra referência caso precise recriar num domínio novo.

**1. Node 22 via alt-nodejs (já disponível na Hostinger)** — não precisa instalar, só usar o path completo `/opt/alt/alt-nodejs22/root/usr/bin/node`.

**2. `.env` de produção** em `~/domains/raimundopadilha.com.br/blog-padilha/.env`:
```
DATABASE_URL="file:./db/prod.db"
ADMIN_PASSWORD="<senha-forte-do-painel>"
SESSION_SECRET="<gerado-com-openssl-rand-base64-32>"
NEXT_PUBLIC_SITE_URL="https://raimundopadilha.com.br"
NODE_ENV="production"
```

`NEXT_PUBLIC_SITE_URL` é embutido no build — precisa estar setado **antes** do `npm run build` que roda no LOCAL (o build compilado é o que sobe via deploy).

**3. Cron watchdog** no painel Hostinger → Advanced → Cron Jobs:
```
Comando:  bash ~/domains/raimundopadilha.com.br/blog-padilha/start-server.sh >> ~/domains/raimundopadilha.com.br/blog-padilha-cron.log 2>&1
Frequência: */5 * * * * (a cada 5 minutos)
```

**4. Proxy PHP no `public_html`** — o `deploy.sh` já copia `.htaccess` e `api-proxy.php` da pasta `hostinger/` do repo pro `public_html`. Isso faz o domínio HTTPS servido pelo Apache da Hostinger encaminhar tudo pra porta 3003 do Node.

---

## Atualizações futuras

Nada diferente — mesmo comando de sempre:
```bash
bash deploy.sh       # se você tem SSH
# ou
bash deploy-ftp.sh   # se você é colaborador (só FTP)
```

Não precisa de `npm ci` nem `prisma migrate` no server — o bundle standalone traz tudo pronto do build local. Só o `.env` e o SQLite (`db/prod.db`) permanecem no server, preservados entre deploys.

---

## Backup do SQLite

O banco vive em `~/domains/raimundopadilha.com.br/blog-padilha/db/prod.db`.
Backup manual via SSH:
```bash
ssh -p 65002 u275149467@212.85.6.130 "cd ~/domains/raimundopadilha.com.br/blog-padilha && sqlite3 db/prod.db \".backup db/backup-\$(date +%Y%m%d).db\""
```

Pra automatizar, agendar via painel Hostinger → Cron Jobs (backup diário às 3h).

---

## Troubleshooting

**Site fora do ar após deploy**
- SSH: `tail -30 ~/domains/raimundopadilha.com.br/blog-padilha-server.log`
- Verifica se o processo tá rodando: `cat ~/domains/raimundopadilha.com.br/blog-padilha-server.pid && ps -p $(cat ~/domains/raimundopadilha.com.br/blog-padilha-server.pid)`
- Força restart manual: `bash ~/domains/raimundopadilha.com.br/blog-padilha/start-server.sh`

**Cron não reinicia após deploy via FTP**
- Verifica se o timestamp do `server.js` é maior que o do `.pid`: `ls -l ~/domains/raimundopadilha.com.br/blog-padilha/server.js ~/domains/raimundopadilha.com.br/blog-padilha-server.pid`
- Aguarde 5 min (próximo tick do cron) ou force manualmente.

**Deploy FTP falhando (lftp erro)**
- Verifica `.env.ftp` com credenciais corretas
- Testa conexão manual: `lftp -u $FTP_USER,$FTP_PASS ftp://$FTP_HOST` (list arquivos com `ls`)
