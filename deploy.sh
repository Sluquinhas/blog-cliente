#!/bin/bash
# ===========================================
# Blog Padilha - Deploy para Hostinger Shared Hosting
# ===========================================
# Uso: bash deploy.sh
#
# Pre-requisitos:
#   - Chave SSH configurada pra $SERVER
#   - No servidor: MySQL criado, .env pronto em ~/blog-padilha/.env
#   - Diretorio $PUBLIC_HTML corresponde ao dominio raimundopadilha.com.br
#     (ajuste ambos abaixo se o dominio ainda estiver via subdominio Hostinger)

set -e

SERVER="u275149467@212.85.6.130"
PORT=65002
# blog-padilha agora vive dentro do dominio (restruturacao 18/07/2026) —
# permite dar acesso FTP isolado pro amigo sem expor outros projetos.
REMOTE_DIR="/home/u275149467/domains/raimundopadilha.com.br/blog-padilha"
PUBLIC_HTML="/home/u275149467/domains/raimundopadilha.com.br/public_html"

echo "=========================================="
echo "  Blog Padilha - Deploy para Producao"
echo "=========================================="

cd "$(dirname "$0")"

# 1. Build do Next.js (modo standalone)
echo ""
echo "[1/5] Build do Next.js..."
npm run build
echo "OK"

# 2. Montar bundle standalone (Next nao copia .next/static nem public sozinho)
echo ""
echo "[2/5] Montando bundle standalone..."
rm -rf .next/standalone/.next/static
rm -rf .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
echo "OK"

# 3. Empacotar (staging pra montar tudo antes de compactar de uma vez)
echo ""
echo "[3/5] Empacotando..."
STAGING=".deploy-staging"
rm -rf "$STAGING"
mkdir -p "$STAGING/blog-padilha"
cp -r .next/standalone/. "$STAGING/blog-padilha/"
[ -f start-server.sh ] && cp start-server.sh "$STAGING/start-server.sh"
[ -d hostinger ] && cp -r hostinger "$STAGING/hostinger"
[ -d db ] && cp -r db "$STAGING/db"
[ -d scripts ] && cp -r scripts "$STAGING/scripts"
[ -f .env.production ] && cp .env.production "$STAGING/.env.production"
tar -czf deploy-bundle.tar.gz -C "$STAGING" .
rm -rf "$STAGING"
echo "OK"

# 4. Enviar
echo ""
echo "[4/5] Enviando para o servidor..."
scp -P $PORT deploy-bundle.tar.gz $SERVER:~/
echo "OK"

# 5. Instalar no servidor
echo ""
echo "[5/5] Instalando no servidor..."
ssh -p $PORT $SERVER bash <<REMOTE
set -e
export PATH=/opt/alt/alt-nodejs22/root/usr/bin:/opt/alt/alt-nodejs20/root/usr/bin:\$PATH

REMOTE_DIR="$REMOTE_DIR"
PUBLIC_HTML="$PUBLIC_HTML"
PID_FILE="\$HOME/domains/raimundopadilha.com.br/blog-padilha-server.pid"

# Parar processo Node ANTES de mexer nos arquivos (next-server ou node server.js)
if [ -f "\$PID_FILE" ]; then
  OLD_PID=\$(cat "\$PID_FILE")
  kill -9 "\$OLD_PID" 2>/dev/null || true
  rm -f "\$PID_FILE"
fi
# Mata so o processo desta app (nao o Pendollu/Arena) usando o REMOTE_DIR como filtro.
pkill -9 -f "node.*\$REMOTE_DIR/server.js" 2>/dev/null || true
sleep 2

mkdir -p "\$REMOTE_DIR"

# Limpar pasta antiga (preservando .env, node_modules e logs)
find "\$REMOTE_DIR" -mindepth 1 -maxdepth 1 \\
  ! -name '.env' \\
  ! -name 'node_modules' \\
  ! -name '*.log' \\
  -exec rm -rf {} +

# Extrair bundle numa pasta temporaria
EXTRACT_DIR="\$HOME/.blog-padilha-deploy-tmp"
rm -rf "\$EXTRACT_DIR"
mkdir -p "\$EXTRACT_DIR"
cd "\$EXTRACT_DIR"
tar -xzf "\$HOME/deploy-bundle.tar.gz"
rm -f "\$HOME/deploy-bundle.tar.gz"

# Mover conteudo de blog-padilha/ pra REMOTE_DIR
if [ -d "\$EXTRACT_DIR/blog-padilha" ]; then
  cp -r "\$EXTRACT_DIR/blog-padilha/." "\$REMOTE_DIR/"
fi

# Mover arquivos de infra
if [ -f "\$EXTRACT_DIR/start-server.sh" ]; then
  cp "\$EXTRACT_DIR/start-server.sh" "\$REMOTE_DIR/"
  chmod +x "\$REMOTE_DIR/start-server.sh"
fi
[ -d "\$EXTRACT_DIR/db" ] && cp -r "\$EXTRACT_DIR/db" "\$REMOTE_DIR/"
[ -d "\$EXTRACT_DIR/scripts" ] && cp -r "\$EXTRACT_DIR/scripts" "\$REMOTE_DIR/"
[ -f "\$EXTRACT_DIR/.env.production" ] && cp "\$EXTRACT_DIR/.env.production" "\$REMOTE_DIR/.env"

# Copiar .htaccess e api-proxy.php pra public_html do dominio
if [ -d "\$EXTRACT_DIR/hostinger" ]; then
  if [ -d "\$PUBLIC_HTML" ]; then
    cp "\$EXTRACT_DIR/hostinger/.htaccess" "\$PUBLIC_HTML/.htaccess" 2>/dev/null || echo "AVISO: nao foi possivel copiar .htaccess"
    cp "\$EXTRACT_DIR/hostinger/api-proxy.php" "\$PUBLIC_HTML/api-proxy.php" 2>/dev/null || echo "AVISO: nao foi possivel copiar api-proxy.php"
  else
    echo "AVISO: PUBLIC_HTML nao existe (\$PUBLIC_HTML). Ajuste no deploy.sh."
  fi
fi

rm -rf "\$EXTRACT_DIR"

# Iniciar servidor
bash "\$REMOTE_DIR/start-server.sh" < /dev/null > /dev/null 2>&1 &
disown
sleep 3

if [ -f "\$PID_FILE" ] && kill -0 "\$(cat \$PID_FILE)" 2>/dev/null; then
  echo "Servidor Blog Padilha iniciado! PID: \$(cat \$PID_FILE)"
else
  echo "AVISO: servidor nao iniciou, ultimas linhas do log:"
  tail -10 "\$HOME/blog-padilha-server.log" 2>/dev/null || echo "(sem log)"
fi
REMOTE

rm -f deploy-bundle.tar.gz

echo ""
echo "=========================================="
echo "  Deploy concluido!"
echo "  URL: https://raimundopadilha.com.br"
echo "=========================================="
