import Link from "next/link";
import ThemeToggle from "../../../components/ThemeToggle";

export default function VisualizarArtigoPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Voltar para o painel
          </Link>

          <ThemeToggle />
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Visualizar artigo
            </p>

            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              Prévia do conteúdo
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Veja como o artigo poderá aparecer antes de ser publicado.
            </p>
          </div>

          <Link
            href="/admin/editar/1"
            className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Editar artigo
          </Link>
        </div>

        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <div className="h-64 bg-gradient-to-br from-blue-100 via-gray-100 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />

          <div className="p-6 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Economia
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              Perspectivas da economia brasileira para 2026
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Uma análise dos principais indicadores econômicos e das
              expectativas para os próximos meses.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Raimundo Padilha
              </span>
              <span>•</span>
              <span>25 Maio 2026</span>
              <span>•</span>
              <span>5 min de leitura</span>
            </div>

            <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <p className="whitespace-pre-line text-lg leading-9 text-gray-700 dark:text-gray-300">
                A economia brasileira passa por um momento de atenção, com
                debates sobre juros, inflação, crescimento e investimentos.

                Para investidores, empresários e profissionais, acompanhar os
                indicadores econômicos é essencial para tomar decisões mais
                conscientes.

                Este artigo apresenta uma visão geral sobre os principais fatores
                que podem influenciar o cenário econômico nos próximos meses.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}