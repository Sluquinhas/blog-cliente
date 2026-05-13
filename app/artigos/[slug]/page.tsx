type Props = {
  params: {
    slug: string;
  };
};

export default function ArtigoPage({ params }: Props) {
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
          Artigo
        </span>

        <h1 className="mt-4 text-5xl font-bold leading-tight">
          {params.slug}
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Este é o espaço onde o conteúdo completo do artigo será exibido.
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-lg leading-8 text-gray-700">
            Aqui futuramente entra o texto completo escrito pelo administrador
            no painel do blog. Por enquanto, essa página está usando o slug da
            URL apenas para demonstrar como a rota dinâmica funciona.
          </p>
        </div>
      </article>
    </main>
  );
}