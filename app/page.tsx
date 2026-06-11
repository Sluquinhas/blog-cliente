import Navbar from "./components/Navbar";
import ArticleCard from "./components/ArticleCard";
import Footer from "./components/Footer";
import { listarArtigos } from "./actions/artigos";

export default async function Home() {
  const artigosDoBanco = await listarArtigos();

  const artigosPublicados = artigosDoBanco.filter(
    (artigo) => artigo.status === "Publicado"
  );

const artigoDestaque = artigosPublicados[0];
const outrosArtigos = artigosPublicados;

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Economia e finanças
          </p>

          <h1 className="max-w-md text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:max-w-none md:text-7xl">
            Análises, economia e finanças para decisões mais inteligentes.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:mt-8 md:text-xl md:leading-9">
            Um espaço para acompanhar análises econômicas, mercado financeiro,
            negócios e temas importantes para quem deseja entender melhor o
            cenário atual.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10 md:gap-4">
            <a
              href="#artigos"
              className="rounded-xl bg-gray-950 px-6 py-3 text-center font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Ver análises
            </a>

            <a
              href="/contato"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 md:pb-20">
        <div className="mb-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Destaque
          </p>

          <h2 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            Artigo em destaque
          </h2>
        </div>

        {artigoDestaque ? (
          <a
            href={`/artigos/${artigoDestaque.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-2"
          >
            <div className="min-h-44 bg-gradient-to-br from-blue-100 via-gray-100 to-gray-300 transition-transform duration-300 group-hover:scale-105 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 sm:min-h-72" />

            <div className="flex flex-col p-5 sm:p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                {artigoDestaque.categoria}
              </p>

              <h3 className="mt-5 text-2xl font-black leading-tight text-gray-950 dark:text-white sm:text-4xl">
                {artigoDestaque.titulo}
              </h3>

              <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
                {artigoDestaque.resumo}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {artigoDestaque.autor}
                </span>
                <span>•</span>
                <span>{artigoDestaque.data}</span>
                <span>•</span>
                <span>{artigoDestaque.tempoLeitura}</span>
              </div>

              <span className="mt-auto inline-flex pt-8 font-bold text-blue-600 transition-all duration-300 group-hover:translate-x-1">
                Ler artigo →
              </span>
            </div>
          </a>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-2xl font-black text-gray-950 dark:text-white">
              Nenhum artigo publicado ainda
            </h3>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Os artigos publicados aparecerão aqui automaticamente.
            </p>
          </div>
        )}
      </section>

      <section id="artigos" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-10 md:mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Mais análises
          </p>

          <h2 className="max-w-md text-3xl font-black tracking-tight text-gray-950 dark:text-white sm:text-4xl md:max-w-none md:text-5xl">
            Continue acompanhando as publicações.
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Veja outros artigos disponíveis no blog.
          </p>
        </div>

        {outrosArtigos.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {outrosArtigos.map((artigo) => (
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
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              Mais publicações aparecerão aqui conforme novos artigos forem
              publicados.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}