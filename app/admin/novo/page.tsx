import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";
import { criarArtigo } from "../../actions/artigos";

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

        <form
          action={criarArtigo}
          className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Título
              </label>

              <input
                name="titulo"
                type="text"
                required
                placeholder="Digite o título do artigo"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Categoria
              </label>

              <select
                name="categoria"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option>Economia</option>
                <option>Finanças</option>
                <option>Mercado</option>
                <option>Opinião</option>
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Autor
              </label>

              <input
                name="autor"
                type="text"
                required
                placeholder="Nome do autor"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Data
              </label>

              <input
                name="data"
                type="date"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
                Tempo de leitura
              </label>

              <input
                name="tempoLeitura"
                type="text"
                required
                placeholder="Ex: 5 min"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
              Imagem de capa
            </label>

            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Envie uma imagem para destacar o artigo
              </p>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                PNG, JPG ou WEBP até 5MB
              </p>

              <input
                name="imagemCapa"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="mt-5 w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block font-semibold text-gray-800 dark:text-gray-200">
              Resumo
            </label>

            <textarea
              name="resumo"
              required
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
              name="conteudo"
              required
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

            <button
              type="submit"
              name="status"
              value="Rascunho"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Salvar rascunho
            </button>

            <button
              type="submit"
              name="status"
              value="Publicado"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Publicar artigo
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}