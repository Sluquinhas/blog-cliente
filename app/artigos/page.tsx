import type { Metadata } from "next";
import { listarArtigos } from "../actions/artigos";
import ArtigosClient from "./ArtigosClient";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos e análises sobre economia, mercado financeiro e investimentos publicados por Raimundo Padilha.",
  alternates: { canonical: "/artigos" },
};

// Sem isso, o Next.js gera essa pagina estaticamente no build (usando
// o banco local de quem rodou `npm run build`) e ela nunca mais reflete
// artigos publicados/editados depois via /admin ate o proximo deploy.
export const dynamic = "force-dynamic";

export default async function ArtigosPage() {
  const artigosDoBanco = await listarArtigos();

  const artigosPublicados = artigosDoBanco
    .filter((artigo) => artigo.status === "Publicado");

  return <ArtigosClient artigos={artigosPublicados} />;
}