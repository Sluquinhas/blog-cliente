import Link from "next/link";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { artigos } from "../../data/artigos";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;

  const artigo = artigos.find((item) => item.slug === slug);

  if (!artigo) {
    return (
      <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-4xl font-black text-gray-950 dark:text-white">
            Artigo não encontrado
          </h1>

          <Link href="/artigos" className="mt-6 inline-block font-semibold text-blue-600">
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

      <article className="mx-auto max-w-4xl px-6 py-20">
        <Link
          href="/artigos"
          className="inline-block text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          ← Voltar para artigos
        </Link>

        <div className="mt-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            {artigo.categoria}
          </p>

          <h1 className="mt-5 text-5xl font-black leading-tight tracking-tight text-gray-950 dark:text-white md:text-6xl">
            {artigo.titulo}
          </h1>

          <p className="mt-6 text-xl leading-9 text-gray-600 dark:text-gray-400">
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
        </div>

        <div className="mt-12 h-72 rounded-3xl border border-gray-200 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200 shadow-sm dark:border-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />

        <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="whitespace-pre-line text-lg leading-9 text-gray-700 dark:text-gray-300">
            {artigo.conteudo}
          </p>
        </section>
      </article>

      <Footer />
    </main>
  );
}