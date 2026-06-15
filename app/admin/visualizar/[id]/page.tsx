import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "../../../components/ThemeToggle";
import Capa from "../../../components/Capa";
import { buscarArtigoPorId } from "../../../actions/artigos";
import LogoutButton from "../../LogoutButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function VisualizarArtigoPage({ params }: Props) {
  const { id } = await params;
  const artigo = await buscarArtigoPorId(Number(id));

  if (!artigo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Voltar para o painel
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Visualizar artigo
            </p>

            <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              Prévia do conteúdo
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              {artigo.status === "Publicado"
                ? "Este artigo está publicado e visível no blog."
                : "Este artigo é um rascunho e ainda não aparece no blog."}
            </p>
          </div>

          <Link
            href={`/admin/editar/${artigo.id}`}
            className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Editar artigo
          </Link>
        </div>

        <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <Capa
            src={artigo.imagemCapa}
            alt={`Imagem de capa: ${artigo.titulo}`}
            className="h-64"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />

          <div className="p-6 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              {artigo.categoria}
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl">
              {artigo.titulo}
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {artigo.resumo}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {artigo.autor}
              </span>
              <span>•</span>
              <span>{artigo.data}</span>
              <span>•</span>
              <span>{artigo.tempoLeitura}</span>
            </div>

            <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-950">
              <p className="whitespace-pre-line text-lg leading-9 text-gray-700 dark:text-gray-300">
                {artigo.conteudo}
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
