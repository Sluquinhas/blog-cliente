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
    <Link
      href={`/artigos/${slug}`}
      className="group block h-full rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <div className="h-44 bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200 transition-transform duration-300 group-hover:scale-105 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            {categoria}
          </p>

          <h3 className="mt-4 text-2xl font-black leading-tight text-gray-950 dark:text-white">
            {titulo}
          </h3>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
            {resumo}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{autor}</span>
            <span>•</span>
            <span>{data}</span>
          </div>

          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
            {tempoLeitura}
          </p>

          <span className="mt-auto inline-flex items-center pt-8 font-bold text-blue-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-700">
            Ler artigo <span className="ml-1">→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}