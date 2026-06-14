import type { Metadata } from "next";
import { listarArtigos } from "../actions/artigos";
import ArtigosClient from "./ArtigosClient";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos e análises sobre economia, mercado financeiro e investimentos publicados por Raimundo Padilha.",
  alternates: { canonical: "/artigos" },
};

export default async function ArtigosPage() {
  const artigosDoBanco = await listarArtigos();

  const artigosPublicados = artigosDoBanco
    .filter((artigo) => artigo.status === "Publicado");

  return <ArtigosClient artigos={artigosPublicados} />;
}