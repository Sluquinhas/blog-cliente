import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "../../../components/ThemeToggle";
import { buscarArtigoPorId, atualizarArtigo } from "../../../actions/artigos";
import LogoutButton from "../../LogoutButton";
import { CATEGORIAS } from "@/lib/constants";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarArtigoPage({ params }: Props) {
  const { id } = await params;
  const artigo = await buscarArtigoPorId(Number(id));

  if (!artigo) {
    notFound();
  }

  const categorias = CATEGORIAS.includes(artigo.categoria)
    ? CATEGORIAS
    : [artigo.categoria, ...CATEGORIAS];

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

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Editar artigo
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
            Atualizar conteúdo
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Altere as informações do artigo e salve as modificações.
          </p>
        </div>

        <form
          action={atualizarArtigo}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >
          <input type="hidden" name="id" value={artigo.id} />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="titulo"
                className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
              >
                Título
              </label>

              <input
                id="titulo"
                name="titulo"
                type="text"
                required
                defaultValue={artigo.titulo}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="categoria"
                className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
              >
                Categoria
              </label>

              <select
                id="categoria"
                name="categoria"
                defaultValue={artigo.categoria}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="autor"
                className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
              >
                Autor
              </label>

              <input
                id="autor"
                name="autor"
                type="text"
                required
                defaultValue={artigo.autor}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="data"
                className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
              >
                Data
              </label>

              <input
                id="data"
                name="data"
                type="text"
                required
                defaultValue={artigo.data}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="tempoLeitura"
                className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
              >
                Tempo de leitura
              </label>

              <input
                id="tempoLeitura"
                name="tempoLeitura"
                type="text"
                required
                defaultValue={artigo.tempoLeitura}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="imagemCapa"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              URL da imagem de capa{" "}
              <span className="font-normal text-gray-500 dark:text-gray-400">
                (opcional)
              </span>
            </label>

            <input
              id="imagemCapa"
              name="imagemCapa"
              type="url"
              inputMode="url"
              defaultValue={artigo.imagemCapa ?? ""}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="resumo"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Resumo
            </label>

            <textarea
              id="resumo"
              name="resumo"
              required
              rows={4}
              defaultValue={artigo.resumo}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="conteudo"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Conteúdo
            </label>

            <textarea
              id="conteudo"
              name="conteudo"
              required
              rows={12}
              defaultValue={artigo.conteudo}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="status"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue={artigo.status}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:max-w-xs"
            >
              <option value="Publicado">Publicado</option>
              <option value="Rascunho">Rascunho</option>
            </select>
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
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
