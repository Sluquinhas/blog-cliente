import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Capas são enviadas do dispositivo pelo painel; o padrão é 1 MB.
      // 6 MB acomoda a validação de até 5 MB feita no server action.
      bodySizeLimit: "6mb",
    },
  },

  images: {
    // As capas de seed são SVGs próprios (em /public/capas). Para servi-los via
    // next/image precisamos permitir SVG; a CSP abaixo isola o conteúdo.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Capas de novos artigos são informadas por URL pelo admin autenticado.
    // Permitimos qualquer host HTTPS (a superfície é controlada pelo painel).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
