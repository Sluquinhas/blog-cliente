import { listarArtigos } from "../actions/artigos";
import ArtigosClient from "./ArtigosClient";

export default async function ArtigosPage() {
  const artigosDoBanco = await listarArtigos();

  const artigosPublicados = artigosDoBanco
    .filter((artigo) => artigo.status === "Publicado");

  return <ArtigosClient artigos={artigosPublicados} />;
}