import Navbar from "./components/Navbar";
import ArticleCard from "./components/ArticleCard";
import { artigos } from "./data/artigos";

export default function(){
  return(
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
          Novo blog
        </p>

        <h2 className="max-w-3xl text-5xl font-bold leading-tight">
           Artigos sobre ideias, atualidades, tecnologia, viagens e assuntos
          variados.
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Um espaço para publicar conteúdos diversos de forma simples,
          organizada e profissional.
        </p>
      </section>

      <section id="artigos" className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
       {artigos.map((artigo) => (
          <ArticleCard
            key={artigo.slug}
            titulo={artigo.titulo}
            resumo={artigo.resumo}
            categoria={artigo.categoria}
            slug={artigo.slug}
          />
        ))}
      </section>
    </main>
  )
}