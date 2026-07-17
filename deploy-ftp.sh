#!/bin/bash
# ============================================================================
# Blog Padilha - Deploy via FTP (para colaboradores sem SSH)
# ============================================================================
# Uso: bash deploy-ftp.sh
#
# Este script eh a alternativa ao deploy.sh pra quem NAO tem SSH direto no
# servidor Hostinger. Faz build local, empacota, envia via SFTP, e o cron
# do server reinicia o Node automaticamente em ate 5 min (start-server.sh
# detecta server.js atualizado).
#
# Pre-requisitos:
#   - lftp instalado (Ubuntu: sudo apt install lftp | Mac: brew install lftp)
#     OU winscp/filezilla CLI no Windows
#   - Variaveis de ambiente FTP setadas (ver secao abaixo)
#
# Como configurar credenciais (opcao 1: env vars diretas):
#   export FTP_HOST=ftp.raimundopadilha.com.br
#   export FTP_USER=u275149467.padilhaamigo
#   export FTP_PASS=<senha>
#
# Como configurar credenciais (opcao 2: arquivo .env.ftp na raiz do repo):
#   Cria .env.ftp com:
#     FTP_HOST=ftp.raimundopadilha.com.br
#     FTP_USER=u275149467.padilhaamigo
#     FTP_PASS=<senha>
#   Importante: .env.ftp esta no .gitignore (nao commitar senha).
# ============================================================================

set -e

# Carrega .env.ftp se existir
if [ -f .env.ftp ]; then
  set -a
  # shellcheck disable=SC1091
  source .env.ftp
  set +a
fi

# Valida env vars
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USER" ] || [ -z "$FTP_PASS" ]; then
  echo "ERRO: FTP_HOST, FTP_USER e FTP_PASS precisam estar setados."
  echo "Ver instrucoes no topo deste arquivo."
  exit 1
fi

# Path remoto: o FTP eh chrootado em /home/u275149467/domains/raimundopadilha.com.br/
# entao "/" no FTP corresponde a esse diretorio no server. blog-padilha/ fica
# como subdiretorio, publico_html/ e logs tambem estao acessiveis.
REMOTE_APP_DIR="/blog-padilha"
REMOTE_PUBLIC_HTML="/public_html"

echo "=========================================="
echo "  Blog Padilha - Deploy via FTP"
echo "=========================================="

cd "$(dirname "$0")"

# 1. Build do Next.js
echo ""
echo "[1/4] Build do Next.js..."
npm run build
echo "OK"

# 2. Monta bundle standalone
echo ""
echo "[2/4] Montando bundle standalone..."
rm -rf .next/standalone/.next/static
rm -rf .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
echo "OK"

# 3. Upload via lftp (mirror do standalone)
echo ""
echo "[3/4] Upload dos arquivos..."

# Verifica se lftp existe
if ! command -v lftp >/dev/null 2>&1; then
  echo "ERRO: lftp nao encontrado."
  echo "  Ubuntu/Debian: sudo apt install lftp"
  echo "  Mac:           brew install lftp"
  echo "  Windows:       usa WSL ou instala pelo Chocolatey (choco install lftp)"
  exit 1
fi

# .htaccess/api-proxy.php do public_html so sao reenviados se existirem localmente
# (lftp nao entende `[ -f ... ]`, entao o teste eh feito aqui em bash e as linhas
# extras sao montadas condicionalmente antes de chamar o lftp).
EXTRA_PUTS=""
if [ -f hostinger/.htaccess ]; then
  EXTRA_PUTS="$EXTRA_PUTS put -O $REMOTE_PUBLIC_HTML hostinger/.htaccess;"
fi
if [ -f hostinger/api-proxy.php ]; then
  EXTRA_PUTS="$EXTRA_PUTS put -O $REMOTE_PUBLIC_HTML hostinger/api-proxy.php;"
fi

lftp -e "
set ssl:verify-certificate no;
set ftp:ssl-allow yes;
set ftp:ssl-force yes;
open -u $FTP_USER,$FTP_PASS ftp://$FTP_HOST;

# Mirror do standalone -> blog-padilha/ (exclui apenas arquivos sensiveis; o
# node_modules AQUI e o bundle minimo que o proprio Next.js standalone empacota
# pra rodar em producao — nao e o node_modules da raiz do repo, e nao pode ser
# excluido, senao o server.js sobe sem dependencias e o processo Node quebra)
mirror --reverse --delete --verbose --exclude-glob .env --exclude-glob .env.* --exclude-glob *.log --exclude-glob *.pid .next/standalone/ $REMOTE_APP_DIR;

# Copia start-server.sh (fora do standalone)
put -O $REMOTE_APP_DIR start-server.sh;

$EXTRA_PUTS
bye
" || {
  echo "ERRO: upload falhou. Verifica credenciais e conexao."
  exit 1
}

echo "OK"

# 4. Aviso sobre restart
echo ""
echo "[4/4] Restart automatico:"
echo "  O cron do server detecta o server.js atualizado a cada 5 minutos"
echo "  e reinicia o Node.js automaticamente. Nao precisa fazer nada."
echo ""
echo "=========================================="
echo "  Deploy concluido!"
echo "  URL: https://raimundopadilha.com.br"
echo "  (site pode levar ate 5 min pra atualizar)"
echo "=========================================="
