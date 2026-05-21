import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import { artigos } from "../data/artigos";


export default function ArtigosPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
          Todos os artigos
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          Explore todos os conteúdos publicados.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Veja os artigos disponíveis no blog, organizados por categoria e tema.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
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
      <Footer />
    </main>
  );
}