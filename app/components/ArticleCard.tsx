import Link from "next/link";

type Props = {
  titulo: string;
  resumo: string;
  categoria: string;
  slug: string;
  autor: string;
  data: string;
  tempoLeitura: string;
};

export default function ArticleCard({
  titulo,
  resumo,
  categoria,
  slug,
  autor,
  data,
  tempoLeitura,
}: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-44 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200" />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          {categoria}
        </p>

        <h3 className="mt-4 text-2xl font-black leading-tight text-gray-950">
          {titulo}
        </h3>

        <p className="mt-4 leading-7 text-gray-600">
          {resumo}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <span>{autor}</span>
          <span>•</span>
          <span>{data}</span>
        </div>

        <p className="mt-1 text-sm text-gray-400">
          {tempoLeitura}
        </p>

        <Link
          href={`/artigos/${slug}`}
          className="mt-auto inline-flex items-center pt-8 font-bold text-blue-600 transition hover:gap-2 hover:text-blue-700"
        >
          Ler artigo <span className="ml-1">→</span>
        </Link>
      </div>
    </article>
  );
}