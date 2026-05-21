type ArticleCardProps = {
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
}: ArticleCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <span className="text-sm font-semibold text-blue-600">
        {categoria}
      </span>

      <h3 className="mt-4 text-xl font-bold">{titulo}</h3>

      <p className="mt-3 text-gray-600">{resumo}</p>

      <a
        href={`/artigos/${slug}`}
        className="mt-auto inline-block pt-6 font-semibold text-blue-600"
      >
        Ler artigo →
      </a>
    </article>
  );
}