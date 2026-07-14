"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  id?: string;
  name: string;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
};

// Campo de categoria com dropdown estilizado: o admin escolhe uma sugestão da
// lista OU digita um assunto novo. O valor real vai num input oculto para o
// server action, e a lista é apenas sugestão (não limita o que pode ser salvo).
export default function CategoriaInput({
  id,
  name,
  options,
  defaultValue = "",
  placeholder,
}: Props) {
  const [valor, setValor] = useState(defaultValue);
  const [aberto, setAberto] = useState(false);
  const [destaque, setDestaque] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora do componente.
  useEffect(() => {
    function aoClicarFora(evento: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(evento.target as Node)
      ) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  const termo = valor.trim().toLowerCase();
  const sugestoes = termo
    ? options.filter((opcao) => opcao.toLowerCase().includes(termo))
    : options;

  function selecionar(opcao: string) {
    setValor(opcao);
    setAberto(false);
    setDestaque(-1);
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Valor enviado ao servidor */}
      <input type="hidden" name={name} value={valor} />

      <input
        id={id}
        type="text"
        autoComplete="off"
        value={valor}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={aberto}
        aria-controls={`${id ?? name}-lista`}
        onChange={(e) => {
          setValor(e.target.value);
          setAberto(true);
          setDestaque(-1);
        }}
        onFocus={() => setAberto(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setAberto(true);
            setDestaque((d) => Math.min(d + 1, sugestoes.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setDestaque((d) => Math.max(d - 1, 0));
          } else if (e.key === "Enter") {
            if (aberto && destaque >= 0 && sugestoes[destaque]) {
              e.preventDefault();
              selecionar(sugestoes[destaque]);
            }
          } else if (e.key === "Escape") {
            setAberto(false);
          }
        }}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-11 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />

      <button
        type="button"
        tabIndex={-1}
        aria-label="Abrir lista de assuntos"
        onClick={() => setAberto((a) => !a)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${aberto ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {aberto && sugestoes.length > 0 && (
        <ul
          id={`${id ?? name}-lista`}
          role="listbox"
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          {sugestoes.map((opcao, i) => (
            <li key={opcao} role="option" aria-selected={opcao === valor}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setDestaque(i)}
                onClick={() => selecionar(opcao)}
                className={`block w-full px-4 py-2.5 text-left text-gray-800 transition dark:text-gray-100 ${
                  i === destaque
                    ? "bg-blue-50 dark:bg-gray-700"
                    : "hover:bg-blue-50 dark:hover:bg-gray-700"
                }`}
              >
                {opcao}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
