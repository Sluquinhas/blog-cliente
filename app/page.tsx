import Navbar from "./components/Navbar";
import ArticleCard from "./components/ArticleCard";
import Footer from "./components/Footer";
import { artigos } from "./data/artigos";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Novo blog
          </p>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-950 dark:text-white md:text-7xl">
            Conteúdos, ideias e artigos para pessoas curiosas.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-600 dark:text-gray-400">
            Um espaço moderno para compartilhar tecnologia, viagens, opiniões e
            conteúdos diversos de forma simples, organizada e profissional.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#artigos"
              className="rounded-xl bg-gray-950 px-6 py-3 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Explorar artigos
            </a>

            <a
              href="/contato"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </section>

      <section
        id="artigos"
        className="mx-auto max-w-6xl px-6 pb-24"
      >
        <div className="mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Todos os artigos
          </p>

          <h2 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
            Explore todos os conteúdos publicados.
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Veja os artigos disponíveis no blog, organizados por categoria e
            tema.
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