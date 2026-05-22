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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-44 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 transition group-hover:scale-[1.02]"></div>

      <p className="mt-6 text-sm font-semibold uppercase text-blue-600">
        {categoria}
      </p>

      <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-950">
        {titulo}
      </h3>

      <p className="mt-4 text-gray-600">{resumo}</p>

      <Link
        href={`/artigos/${slug}`}
        className="mt-auto inline-block pt-6 font-semibold text-blue-600"
      >
        Ler artigo →
      </Link>
    </article>
  );
}