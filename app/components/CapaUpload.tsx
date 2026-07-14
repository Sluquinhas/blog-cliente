"use client";

import { useRef, useState } from "react";

const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5 MB

type Props = {
  id?: string;
  name: string;
  /** Capa já salva no artigo (usado na edição). */
  capaAtual?: string | null;
};

// Campo de upload da capa com pré-visualização e validação amigável no
// navegador: mostra a miniatura assim que a foto é escolhida e avisa na hora
// se o formato/tamanho forem inválidos, evitando a tela de erro no envio.
export default function CapaUpload({ id, name, capaAtual = null }: Props) {
  const [preview, setPreview] = useState<string | null>(capaAtual);
  const [nomeArquivo, setNomeArquivo] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function limparSelecao() {
    if (inputRef.current) inputRef.current.value = "";
    setPreview(capaAtual);
    setNomeArquivo(null);
  }

  function aoEscolher(evento: React.ChangeEvent<HTMLInputElement>) {
    setErro(null);
    const arquivo = evento.target.files?.[0];

    if (!arquivo) {
      limparSelecao();
      return;
    }

    if (!TIPOS_ACEITOS.includes(arquivo.type)) {
      setErro("Formato não aceito. Escolha uma foto JPG, PNG, WEBP ou GIF.");
      limparSelecao();
      return;
    }

    if (arquivo.size > TAMANHO_MAXIMO) {
      const mb = (arquivo.size / (1024 * 1024)).toFixed(1);
      setErro(
        `Esta foto tem ${mb} MB e o limite é 5 MB. Escolha uma foto menor.`
      );
      limparSelecao();
      return;
    }

    setPreview(URL.createObjectURL(arquivo));
    setNomeArquivo(arquivo.name);
  }

  return (
    <div>
      {preview && (
        <div className="mb-3">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {nomeArquivo ? "Nova capa escolhida:" : "Capa atual:"}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Pré-visualização da capa"
            className="h-40 w-full max-w-xs rounded-xl object-cover"
          />
        </div>
      )}

      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept="image/*"
        onChange={aoEscolher}
        className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      {nomeArquivo && (
        <button
          type="button"
          onClick={limparSelecao}
          className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          Remover foto escolhida
        </button>
      )}

      {erro && (
        <p
          role="alert"
          className="mt-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          {erro}
        </p>
      )}
    </div>
  );
}
