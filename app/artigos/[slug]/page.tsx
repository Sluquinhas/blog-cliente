import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Capa from "../../components/Capa";
import { buscarArtigoPorSlug } from "../../actions/artigos";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Memoiza a busca para reutilizar entre generateMetadata e a página.
const getArtigo = cache((slug: string) => buscarArtigoPorSlug(slug));

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://padilha.com.br";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo || artigo.status !== "Publicado") {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: artigo.titulo,
    description: artigo.resumo,
    alternates: { canonical: `/artigos/${artigo.slug}` },
    openGraph: {
      type: "article",
      title: artigo.titulo,
      description: artigo.resumo,
      url: `${SITE_URL}/artigos/${artigo.slug}`,
      publishedTime: artigo.createdAt.toISOString(),
      modifiedTime: artigo.updatedAt.toISOString(),
      authors: [artigo.autor],
      ...(artigo.imagemCapa ? { images: [artigo.imagemCapa] } : {}),
    },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = await getArtigo(slug);

  if (!artigo || artigo.status !== "Publicado") {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: artigo.titulo,
    description: artigo.resumo,
    articleSection: artigo.categoria,
    datePublished: artigo.createdAt.toISOString(),
    dateModified: artigo.updatedAt.toISOString(),
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: artigo.autor },
    publisher: { "@type": "Organization", name: "Padilha Participações" },
    mainEntityOfPage: `${SITE_URL}/artigos/${artigo.slug}`,
    ...(artigo.imagemCapa ? { image: artigo.imagemCapa } : {}),
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <Link
          href="/artigos"
          className="inline-block text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          ← Voltar para artigos
        </Link>

        <header className="mt-8 md:mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:text-sm">
            {artigo.categoria}
          </p>

          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:text-6xl">
            {artigo.titulo}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:text-xl md:leading-9">
            {artigo.resumo}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {artigo.autor}
            </span>
            <span>•</span>
            <span>{artigo.data}</span>
            <span>•</span>
            <span>{artigo.tempoLeitura}</span>
          </div>
        </header>

        <Capa
          src={artigo.imagemCapa}
          alt={`Imagem de capa: ${artigo.titulo}`}
          className="mt-10 h-52 rounded-3xl border border-gray-200 shadow-sm dark:border-gray-800 md:mt-12 md:h-80"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
        />

        <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 md:mt-12 md:p-10">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="whitespace-pre-line text-base leading-8 text-gray-700 dark:text-gray-300 md:text-lg md:leading-9">
              {artigo.conteudo}
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-8 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/artigos"
            className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
          >
            ← Voltar para artigos
          </Link>

          <Link
            href="/contato"
            className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Entrar em contato
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
