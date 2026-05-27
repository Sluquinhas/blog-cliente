"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import { artigos } from "../data/artigos";

const categorias = ["Todos", "Tecnologia", "Viagens", "Opinião"];

export default function ArtigosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  const artigosFiltrados =
    categoriaAtiva === "Todos"
      ? artigos
      : artigos.filter((artigo) => artigo.categoria === categoriaAtiva);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Artigos
        </p>

        <h1 className="text-5xl font-black tracking-tight text-gray-950 dark:text-white">
          Explore todos os conteúdos publicados.
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-9 text-gray-600 dark:text-gray-400">
          Veja os artigos disponíveis no blog, organizados por categoria e tema.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
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
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 md:grid-cols-3">
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
      </section>

      <Footer />
    </main>
  );
}