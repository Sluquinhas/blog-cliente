import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com Raimundo Padilha e a Padilha Participações. Assessoria de investimentos em Fortaleza/CE.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Contato
        </p>

        <h1 className="max-w-md text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:max-w-none md:text-6xl">
          Entre em contato.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:mt-8 md:text-xl md:leading-9">
          Tem uma dúvida sobre investimentos, uma sugestão de pauta ou uma
          proposta? Fale com a Padilha Participações pelos canais abaixo.
        </p>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                E-mail
              </p>

              <p className="mt-2 break-words text-lg text-gray-700 dark:text-gray-300">
                <a
                  href="mailto:contato@padilha.com.br"
                  className="underline-offset-4 hover:underline"
                >
                  contato@padilha.com.br
                </a>
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Localização
              </p>

              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                Fortaleza — Ceará
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Telefone
              </p>

              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                {"{{TELEFONE}}"}
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
