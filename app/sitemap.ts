import type { MetadataRoute } from "next";
import { listarArtigos } from "./actions/artigos";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://padilha.com.br";

// Sempre reflete o estado atual do banco (inclui artigos criados pelo admin).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artigos = await listarArtigos();

  const rotasArtigos: MetadataRoute.Sitemap = artigos
    .filter((a) => a.status === "Publicado")
    .map((a) => ({
      url: `${SITE_URL}/artigos/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const rotasEstaticas: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/artigos`, priority: 0.9 },
    { url: `${SITE_URL}/sobre`, priority: 0.5 },
    { url: `${SITE_URL}/contato`, priority: 0.5 },
  ];

  return [...rotasEstaticas, ...rotasArtigos];
}
