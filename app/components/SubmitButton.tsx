"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  pendingLabel: string;
  className?: string;
  name?: string;
  value?: string;
};

// Botão de envio que mostra um rótulo de carregamento e se desabilita enquanto
// o formulário é processado — evita cliques duplos e reassegura o usuário.
// Quando há mais de um botão de envio (ex.: "rascunho" e "publicar"), só o
// botão realmente clicado troca para o rótulo de carregamento.
export default function SubmitButton({
  children,
  pendingLabel,
  className,
  name,
  value,
}: Props) {
  const { pending, data } = useFormStatus();

  const ehEsteBotao =
    value == null || (name != null && data?.get(name) === value);
  const carregando = pending && ehEsteBotao;

  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={pending}
      aria-busy={carregando}
      className={`${className ?? ""} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {carregando ? pendingLabel : children}
    </button>
  );
}
