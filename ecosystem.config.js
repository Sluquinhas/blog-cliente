// Configuração do PM2 para rodar o Next.js em produção (next start).
// As variáveis sensíveis (ADMIN_PASSWORD, SESSION_SECRET, DATABASE_URL,
// NEXT_PUBLIC_SITE_URL) devem estar no arquivo .env na raiz do projeto —
// o Next as carrega automaticamente. NUNCA versione o .env.
//
// Uso:
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup   (para subir após reboot)
module.exports = {
  apps: [
    {
      name: "padilha-blog",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      // Ajuste para o diretório onde o projeto está publicado no VPS:
      cwd: "/var/www/padilha-blog",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
