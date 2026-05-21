import { artigos } from "@/app/data/artigos";

type Props = {
  params: {
    slug: string;
  };
};

export default function ArtigoPage({ params }: Props) {
  const artigo = artigos.find((item) => item.slug === params.slug);

  if (!artigo) {
    return (
      <main className="min-h-screen bg-gray-100 p-10 text-gray-900">
        <h1 className="text-4xl font-bold">Artigo não encontrado</h1>

        <a href="/" className="mt-6 inline-block text-blue-600">
          Voltar para início
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-6">
          <a href="/" className="text-2xl font-bold">
            Blog do Cliente
          </a>

          <a href="/" className="text-sm font-medium text-blue-600">
            Voltar para início
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-16">
        <span className="text-sm font-semibold uppercase text-blue-600">
          {artigo.categoria}
        </span>

        <h1 className="mt-4 text-5xl font-bold leading-tight">
          {artigo.titulo}
        </h1>

        <p className="mt-6 text-lg text-gray-600">{artigo.resumo}</p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="whitespace-pre-line text-lg leading-8 text-gray-700">
            {artigo.conteudo}
          </p>
        </div>
      </article>
    </main>
  );
}