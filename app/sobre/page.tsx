import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Sobre o blog
        </p>

        <h1 className="max-w-md text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:max-w-none md:text-6xl">
          Um espaço moderno para compartilhar ideias.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:mt-8">
          Este blog foi criado para publicar conteúdos sobre tecnologia,
          viagens, opiniões e temas diversos de forma organizada, moderna e
          agradável para leitura.
        </p>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
            <h2 className="text-xl font-black text-gray-950 dark:text-white">
              Tecnologia
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              Conteúdos sobre programação, inovação, inteligência artificial e
              tendências do mundo tech.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
            <h2 className="text-xl font-black text-gray-950 dark:text-white">
              Viagens
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              Dicas, experiências e ideias para quem gosta de explorar novos
              lugares e culturas.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
            <h2 className="text-xl font-black text-gray-950 dark:text-white">
              Opinião
            </h2>

            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
              Reflexões sobre sociedade, comportamento, criatividade e
              cotidiano.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}