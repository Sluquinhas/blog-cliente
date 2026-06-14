"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type LoginState } from "../../actions/auth";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    undefined
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Painel administrativo
        </p>

        <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">
          Acesso restrito
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Informe a senha para gerenciar os artigos do blog.
        </p>

        <form action={action} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="senha"
              className="mb-2 block font-semibold text-gray-800 dark:text-gray-200"
            >
              Senha
            </label>

            <input
              id="senha"
              name="senha"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              aria-describedby={state?.erro ? "senha-erro" : undefined}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {state?.erro && (
            <p
              id="senha-erro"
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
            >
              {state.erro}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          ← Voltar para o blog
        </Link>
      </div>
    </main>
  );
}
