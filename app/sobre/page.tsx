import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import { artigos } from "../data/artigos";

export default function ArtigosPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        
        <div className="mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Todos os artigos
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
            Explore todos os conteúdos publicados.
          </h1>

          <p className="mt-5 max-w-3xl text-xl leading-9 text-gray-600 dark:text-gray-400">
            Veja os artigos disponíveis no blog, organizados por categoria e tema.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {artigos.map((artigo) => (
            <ArticleCard
              key={artigo.slug}
              titulo={artigo.titulo}
              resumo={artigo.resumo}
              categoria={artigo.categoria}
              slug={artigo.slug}
            />
          ))}
        </div>

      </section>

      <Footer />
    </main>
  );
}