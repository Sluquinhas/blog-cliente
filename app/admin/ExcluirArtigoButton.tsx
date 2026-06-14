"use client";

import { excluirArtigo } from "../actions/artigos";

export default function ExcluirArtigoButton({
  id,
  titulo,
}: {
  id: number;
  titulo: string;
}) {
  return (
    <form
      action={excluirArtigo}
      onSubmit={(e) => {
        if (
          !window.confirm(
            `Excluir o artigo "${titulo}"? Esta ação não pode ser desfeita.`
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
      >
        Excluir
      </button>
    </form>
  );
}
