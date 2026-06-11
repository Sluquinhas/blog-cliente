import Link from "next/link";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { buscarArtigoPorSlug } from "../../actions/artigos";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;

  const artigo = await buscarArtigoPorSlug(slug);

  if (!artigo || artigo.status !== "Publicado") {
    return (
      <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
        <Navbar />

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Erro
          </p>

          <h1 className="text-3xl font-black text-gray-950 dark:text-white md:text-4xl">
            Artigo não encontrado
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            O artigo que você tentou acessar não existe ou foi removido.
          </p>

          <Link
            href="/artigos"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Voltar para artigos
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

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

        <div className="mt-10 h-52 rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200 shadow-sm dark:border-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 md:mt-12 md:h-80" />

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