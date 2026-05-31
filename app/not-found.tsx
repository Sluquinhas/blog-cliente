import Link from "next/link";

export  default function NotFound() {
    return(
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 text-center dark:bg-gray-950">
            <div className="max-w-xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Erro 404
                </p>

                <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
                    Página não encontrada
                </h1>

                <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
                    A página que você tentou acessar não existe ou foi removida.
                </p>

                <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Voltar para a Home
        </Link>
            </div>
        </main>

    );
}