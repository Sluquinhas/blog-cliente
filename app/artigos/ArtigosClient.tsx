"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";

type Artigo = {
  id: number;
  titulo: string;
  resumo: string;
  categoria: string;
  slug: string;
  autor: string;
  data: string;
  tempoLeitura: string;
};

export default function ArtigosClient({
  artigos = [],
}: {
  artigos?: Artigo[];
}) {
  const [busca, setBusca] = useState("");

  const artigosFiltrados = artigos.filter((artigo) => {
    return (
      artigo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      artigo.resumo.toLowerCase().includes(busca.toLowerCase()) ||
      artigo.categoria.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Artigos
        </p>

        <h1 className="text-5xl font-black">
          Explore todos os conteúdos publicados.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Veja os artigos disponíveis no blog.
        </p>

        <div className="mt-10">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar artigos..."
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-900"
          />
        </div>

        <p className="mt-6 text-sm text-gray-500">
          {artigosFiltrados.length} artigo(s) encontrado(s)
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {artigosFiltrados.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {artigosFiltrados.map((artigo) => (
              <ArticleCard
                key={artigo.id}
                titulo={artigo.titulo}
                resumo={artigo.resumo}
                categoria={artigo.categoria}
                slug={artigo.slug}
                autor={artigo.autor}
                data={artigo.data}
                tempoLeitura={artigo.tempoLeitura}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-2xl font-bold">
              Nenhum artigo encontrado
            </h2>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}