import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Sobre o blog
        </p>

        <h1 className="text-5xl font-black tracking-tight text-gray-950 dark:text-white">
          Um espaço moderno para compartilhar ideias.
        </h1>

        <p className="mt-8 text-xl leading-9 text-gray-600 dark:text-gray-400">
          Este blog foi criado para publicar conteúdos sobre tecnologia,
          viagens, opinião, desenvolvimento pessoal e diversos assuntos do
          cotidiano.
        </p>

        <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <p className="leading-8 text-gray-700 dark:text-gray-300">
            O objetivo do projeto é oferecer uma experiência moderna, rápida e
            agradável para leitura de artigos na web. O site foi desenvolvido
            utilizando Next.js, React e TailwindCSS.
          </p>

          <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">
            Este projeto continua em desenvolvimento e futuramente terá um
            painel administrativo para criar, editar e gerenciar artigos.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}