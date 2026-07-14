"use client";

import { useEffect, useState } from "react";
import { excluirArtigo } from "../actions/artigos";
import SubmitButton from "../components/SubmitButton";

export default function ExcluirArtigoButton({
  id,
  titulo,
}: {
  id: number;
  titulo: string;
}) {
  const [aberto, setAberto] = useState(false);

  // Fecha o aviso com a tecla Esc.
  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") setAberto(false);
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
      >
        Excluir
      </button>

      {aberto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`excluir-titulo-${id}`}
          onClick={() => setAberto(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-xl transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600 dark:text-red-400"
                aria-hidden="true"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>

            <h2
              id={`excluir-titulo-${id}`}
              className="text-2xl font-black text-gray-950 dark:text-white"
            >
              Excluir artigo
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Tem certeza que deseja excluir{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                “{titulo}”
              </strong>
              ? Esta ação <strong>não pode ser desfeita</strong>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                Cancelar
              </button>

              <form action={excluirArtigo}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton
                  pendingLabel="Excluindo..."
                  className="w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
                >
                  Sim, excluir
                </SubmitButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
