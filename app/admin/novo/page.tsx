import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

export default function NovoArtigoPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin"
            className="inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Voltar para o painel
          </Link>

          <ThemeToggle />
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Novo artigo
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
            Criar artigo
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Preencha as informações abaixo para criar um novo conteúdo no blog.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Título
              </label>

              <input
                type="text"
                placeholder="Digite o título do artigo"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Categoria
              </label>

              <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option>Tecnologia</option>
                <option>Viagens</option>
                <option>Opinião</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
              Resumo
            </label>

            <textarea
              rows={4}
              placeholder="Resumo do artigo..."
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
              Conteúdo
            </label>

            <textarea
              rows={12}
              placeholder="Escreva o conteúdo completo do artigo..."
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Cancelar
            </Link>

            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
              Publicar artigo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}