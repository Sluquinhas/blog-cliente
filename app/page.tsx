import Navbar from "./components/Navbar";
import ArticleCard from "./components/ArticleCard";
import Footer from "./components/Footer";
import { artigos } from "./data/artigos";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Novo blog
          </p>

          <h2 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-950 md:text-7xl">
            Conteúdos, ideias e artigos para pessoas curiosas.
          </h2>

          <p className="mt-8 text-xl leading-9 text-gray-600">
            Um espaço moderno para compartilhar tecnologia, viagens,
            opiniões e conteúdos diversos de forma simples, organizada
            e profissional.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#artigos"
              className="rounded-xl bg-gray-950 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Explorar artigos
            </a>

            <a
              href="/contato"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </section>

      <section
        id="artigos"
        className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 md:grid-cols-3"
      >
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