import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça Raimundo Padilha — economista, ex-presidente da Bolsa de Valores do Ceará e fundador da Padilha Participações, assessoria de investimentos em Fortaleza/CE.",
  alternates: { canonical: "/sobre" },
};

const PILARES = [
  {
    titulo: "Economia",
    texto:
      "Leitura dos principais indicadores — juros, inflação, atividade e câmbio — para entender o cenário e seus desdobramentos.",
  },
  {
    titulo: "Mercado Financeiro",
    texto:
      "Análises sobre renda fixa, renda variável e os movimentos que influenciam as decisões de investidores e empresas.",
  },
  {
    titulo: "Investimentos",
    texto:
      "Conteúdo para investir com método: diversificação, gestão de risco e construção de patrimônio no longo prazo.",
  },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 pt-8 pb-14 sm:px-6 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Sobre
        </p>

        <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:text-6xl">
          Economia e investimentos com experiência de mercado.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400 md:mt-8">
          Este é o espaço de <strong>Raimundo Padilha</strong>, economista e
          ex-presidente da Bolsa de Valores do Ceará, à frente da{" "}
          <strong>Padilha Participações</strong> — assessoria e gestão de
          investimentos com sede em Fortaleza/CE. Aqui as análises de economia e
          do mercado financeiro são traduzidas em informação clara para apoiar
          decisões mais conscientes.
        </p>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {PILARES.map((pilar) => (
            <div
              key={pilar.titulo}
              className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-6"
            >
              <h2 className="text-xl font-black text-gray-950 dark:text-white">
                {pilar.titulo}
              </h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                {pilar.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <h2 className="text-2xl font-black text-gray-950 dark:text-white">
              Missão
            </h2>
            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
              Aproximar economia e mercado financeiro do dia a dia de
              investidores, empresários e profissionais — com análises sóbrias,
              independentes e baseadas em fundamentos.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <h2 className="text-2xl font-black text-gray-950 dark:text-white">
              Credibilidade
            </h2>
            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
              Trajetória construída no mercado de capitais, da presidência da
              Bolsa de Valores do Ceará à gestão da Padilha Participações,
              acompanhando ciclos econômicos e o comportamento dos investimentos.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center transition-colors dark:border-blue-900/40 dark:bg-blue-950/30 sm:p-8">
          <p className="text-lg leading-8 text-gray-700 dark:text-gray-200">
            Quer conversar sobre investimentos ou tirar uma dúvida?{" "}
            <a
              href="/contato"
              className="font-bold text-blue-600 underline-offset-4 hover:underline"
            >
              Entre em contato
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
