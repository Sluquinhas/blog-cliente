import Link from "next/link";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-16 text-center">
        <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl dark:bg-gray-800">
            🔍
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Erro 404
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
            Página não encontrada
          </h1>

          <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-gray-600 dark:text-gray-400">
            A página que você tentou acessar não existe, foi removida ou teve o
            endereço alterado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Voltar para a Home
            </Link>

            <Link
              href="/artigos"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Ver artigos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}