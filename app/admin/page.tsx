import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";
import Capa from "../components/Capa";
import { listarArtigos } from "../actions/artigos";
import { verifySession } from "../../lib/dal";
import ExcluirArtigoButton from "./ExcluirArtigoButton";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  // Reforço de autorização no servidor (além da checagem otimista do proxy).
  await verifySession();

  const artigosAdmin = await listarArtigos();
  const publicados = artigosAdmin.filter(
    (artigo) => artigo.status === "Publicado"
  ).length;
  const rascunhos = artigosAdmin.length - publicados;

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              ← Voltar para o blog
            </Link>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Painel administrativo
            </p>

            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              Gerenciar artigos
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Área visual para criar, editar e acompanhar os artigos do blog.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ThemeToggle />

            <LogoutButton className="w-full rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 sm:w-auto" />

            <Link
              href="/admin/novo"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Novo artigo
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total de artigos
            </p>

            <h2 className="mt-3 text-5xl font-black text-gray-950 dark:text-white">
              {artigosAdmin.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Publicados
            </p>

            <h2 className="mt-3 text-5xl font-black text-gray-950 dark:text-white">
              {publicados}
            </h2>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Rascunhos
            </p>

            <h2 className="mt-3 text-5xl font-black text-gray-950 dark:text-white">
              {rascunhos}
            </h2>
          </div>
        </div>

        <section className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-200 p-6 dark:border-gray-800">
            <h2 className="text-2xl font-black text-gray-950 dark:text-white">
              Artigos cadastrados
            </h2>
          </div>

          {artigosAdmin.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {artigosAdmin.map((artigo) => (
                <div
                  key={artigo.id}
                  className="flex flex-col gap-5 p-6 transition hover:bg-gray-50 dark:hover:bg-gray-800/50 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <Capa
                      src={artigo.imagemCapa}
                      alt={`Capa de ${artigo.titulo}`}
                      className="hidden h-16 w-24 shrink-0 rounded-lg sm:block"
                      sizes="96px"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        {artigo.categoria}
                      </p>

                      <h3 className="mt-2 text-xl font-black text-gray-950 dark:text-white">
                        {artigo.titulo}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {artigo.data}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-3 md:justify-end">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        artigo.status === "Publicado"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {artigo.status}
                    </span>

                    <Link
                      href={`/admin/visualizar/${artigo.id}`}
                      className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
                    >
                      Visualizar
                    </Link>

                    <Link
                      href={`/admin/editar/${artigo.id}`}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      Editar
                    </Link>

                    <ExcluirArtigoButton id={artigo.id} titulo={artigo.titulo} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <h3 className="text-xl font-black text-gray-950 dark:text-white">
                Nenhum artigo cadastrado
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Crie o primeiro artigo usando o botão “Novo artigo”.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}