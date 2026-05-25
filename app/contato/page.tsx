import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-20">
        
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Contato
        </p>

        <h1 className="text-5xl font-black tracking-tight text-gray-950 dark:text-white">
          Entre em contato.
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-9 text-gray-600 dark:text-gray-400">
          Tem alguma dúvida, sugestão ou proposta? Entre em contato através
          dos canais abaixo.
        </p>

        <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          
          <div className="space-y-6">
            
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Email
              </p>

              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                contato@blogdocliente.com
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Instagram
              </p>

              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                @blogdocliente
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Horário
              </p>

              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                Segunda a Sexta — 08h às 18h
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}