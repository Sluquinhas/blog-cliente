import Link from "next/link";

type Props = {
  titulo: string;
  resumo: string;
  categoria: string;
  slug: string;
};

export default function ArticleCard({
  titulo,
  resumo,
  categoria,
  slug,
}: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      
      <div className="h-48 bg-gray-200 dark:bg-gray-800" />

      <div className="p-6">
        
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
          {categoria}
        </p>

        <h3 className="mt-4 text-3xl font-black leading-tight text-gray-950 dark:text-white">
          {titulo}
        </h3>

        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
          {resumo}
        </p>

        <Link
          href={`/artigos/${slug}`}
          className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
        >
          Ler artigo →
        </Link>

      </div>
    </article>
  );
}