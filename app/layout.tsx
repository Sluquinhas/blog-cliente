import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Economista Raimundo Padilha";
const SITE_DESCRIPTION =
  "Análises de economia, mercado financeiro e investimentos por Raimundo Padilha, " +
  "à frente da Padilha Participações — assessoria de investimentos em Fortaleza/CE.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Economia, mercado e investimentos`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Raimundo Padilha" }],
  creator: "Raimundo Padilha",
  publisher: "Padilha Participações",
  keywords: [
    "economia",
    "mercado financeiro",
    "investimentos",
    "finanças pessoais",
    "renda fixa",
    "renda variável",
    "Fortaleza",
    "Ceará",
    "Padilha Participações",
    "Raimundo Padilha",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Economia, mercado e investimentos`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Economia, mercado e investimentos`,
    description: SITE_DESCRIPTION,
  },
};

// Executado antes da pintura: evita "flash" do tema errado (FOUC).
const themeScript = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark') { document.documentElement.classList.add('dark'); }
} catch (e) {}
`;

// JSON-LD: identidade do site e do autor para mecanismos de busca.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pt-BR",
  author: {
    "@type": "Person",
    name: "Raimundo Padilha",
    jobTitle: "Economista",
    description:
      "Economista e ex-presidente da Bolsa de Valores do Ceará, à frente da Padilha Participações.",
    worksFor: {
      "@type": "Organization",
      name: "Padilha Participações",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fortaleza",
        addressRegion: "CE",
        addressCountry: "BR",
      },
      email: "contato@padilha.com.br",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
