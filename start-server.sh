#!/bin/bash
# Cron job para manter o Node.js (Next.js standalone) vivo na Hostinger.
# Cron atualizado (18/07/2026 — restruturacao pra isolar acesso do amigo do Padilha):
#   */5 * * * * bash ~/domains/raimundopadilha.com.br/blog-padilha/start-server.sh >> ~/domains/raimundopadilha.com.br/blog-padilha-cron.log 2>&1

export PATH=/opt/alt/alt-nodejs22/root/usr/bin:/opt/alt/alt-nodejs20/root/usr/bin:$PATH
APP_DIR="$HOME/domains/raimundopadilha.com.br/blog-padilha"
PID_FILE="$HOME/domains/raimundopadilha.com.br/blog-padilha-server.pid"
LOG_FILE="$HOME/domains/raimundopadilha.com.br/blog-padilha-server.log"
PORT=3003

# Verificar se o processo ja esta rodando
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
        exit 0
    fi
fi

echo "[$(date)] Iniciando servidor Blog Padilha (Next.js standalone) na porta $PORT..."

# Carregar variaveis de ambiente do .env (se existir)
if [ -f "$APP_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$APP_DIR/.env"
  set +a
fi

export PORT
export HOSTNAME="127.0.0.1"

cd "$APP_DIR" || exit 1

# Prefere Node 22, cai pra 20 se nao existir.
if [ -x /opt/alt/alt-nodejs22/root/usr/bin/node ]; then
  NODE_BIN=/opt/alt/alt-nodejs22/root/usr/bin/node
elif [ -x /opt/alt/alt-nodejs20/root/usr/bin/node ]; then
  NODE_BIN=/opt/alt/alt-nodejs20/root/usr/bin/node
else
  NODE_BIN=$(command -v node)
fi

nohup "$NODE_BIN" server.js >> "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"
echo "[$(date)] Servidor iniciado com PID $(cat "$PID_FILE") usando $NODE_BIN"
