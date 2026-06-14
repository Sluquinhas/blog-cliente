"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-16 text-center text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Erro inesperado
        </p>

        <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white md:text-4xl">
          Algo deu errado
        </h1>

        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-gray-600 dark:text-gray-400">
          Ocorreu um problema ao carregar esta página. Tente novamente em alguns
          instantes.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </main>
  );
}
