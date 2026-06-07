"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import { artigos } from "../data/artigos";

const categorias = ["Todos", "Tecnologia", "Viagens", "Opinião"];

export default function ArtigosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [busca, setBusca] = useState("");

  const artigosFiltrados = artigos.filter((artigo) => {
    const correspondeCategoria =
      categoriaAtiva === "Todos" || artigo.categoria === categoriaAtiva;

    const correspondeBusca =
      artigo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      artigo.resumo.toLowerCase().includes(busca.toLowerCase()) ||
      artigo.categoria.toLowerCase().includes(busca.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Artigos
        </p>

        <h1 className="max-w-md text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:max-w-none md:text-6xl">
          Explore todos os conteúdos publicados.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:mt-8 md:text-xl md:leading-9">
          Veja os artigos disponíveis no blog, organizados por categoria e tema.
        </p>

        <div className="mt-10">
          <input
            type="text"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Pesquisar artigos..."
            className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 text-gray-900 outline-none transition focus:border-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaAtiva(categoria)}
              className={`rounded-xl border px-5 py-2 text-sm font-semibold transition ${
                categoriaAtiva === categoria
                  ? "border-white bg-white text-black dark:border-white dark:bg-white dark:text-black"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-950 hover:text-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          {artigosFiltrados.length} artigo(s) encontrado(s)
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {artigosFiltrados.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {artigosFiltrados.map((artigo) => (
              <ArticleCard
                key={artigo.slug}
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
          <div className="rounded-3xl border border-gray-200 bg-white p-5 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
              Nenhum artigo encontrado
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tente buscar por outro termo ou selecionar outra categoria.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}