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

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-950 dark:text-white">
            Artigo não encontrado
          </h1>

          <Link href="/artigos" className="mt-6 inline-block text-blue-600">
            Voltar para artigos
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/artigos"
          className="mb-8 inline-block text-sm font-semibold text-blue-600"
        >
          ← Voltar para artigos
        </Link>

        <p className="text-sm font-semibold uppercase text-blue-600">
          {artigo.categoria}
        </p>

        <h1 className="mt-4 text-5xl font-bold leading-tight text-gray-950 dark:text-white">
          {artigo.titulo}
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-400">
          {artigo.resumo}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{artigo.autor}</span>
          <span>•</span>
          <span>{artigo.data}</span>
          <span>•</span>
          <span>{artigo.tempoLeitura}</span>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="whitespace-pre-line text-lg leading-8 text-gray-700 dark:text-gray-300">
            {artigo.conteudo}
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}