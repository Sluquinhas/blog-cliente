import Link from "next/link";
import ThemeToggle from "../../../components/ThemeToggle";

export default function EditarArtigoPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Voltar para o painel
          </Link>

          <ThemeToggle />
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Editar artigo
          </p>

          <h1 className="text-4xl font-black sm:text-5xl">
            Atualizar conteúdo
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Altere as informações do artigo e salve as modificações.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Título
              </label>

              <input
                type="text"
                defaultValue="Como a tecnologia está mudando o mundo"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Categoria
              </label>

              <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                <option>Tecnologia</option>
                <option>Viagens</option>
                <option>Opinião</option>
              </select>
            </div>

          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div>
              <label className="mb-2 block font-semibold">
                Autor
              </label>

              <input
                type="text"
                defaultValue="Sérgio Lucas"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Data
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Tempo de leitura
              </label>

              <input
                type="text"
                defaultValue="5 min"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold">
              Resumo
            </label>

            <textarea
              rows={4}
              defaultValue="Uma análise simples sobre inovação, inteligência artificial e futuro."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold">
              Conteúdo
            </label>

            <textarea
              rows={12}
              defaultValue="Conteúdo do artigo..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancelar
            </Link>

            <button className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
              Salvar alterações
            </button>

          </div>

        </div>

      </section>
    </main>
  );
}