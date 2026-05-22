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
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl font-bold">
            Artigo não encontrado
          </h1>

          <Link
            href="/artigos"
            className="mt-6 inline-block text-blue-600"
          >
            Voltar para artigos
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
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

        <h1 className="mt-4 text-5xl font-bold leading-tight">
          {artigo.titulo}
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600">
          {artigo.resumo}
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="whitespace-pre-line text-lg leading-8 text-gray-700">
            {artigo.conteudo}
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}