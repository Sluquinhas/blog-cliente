import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
          Contato
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          Entre em contato com o blog.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Use esta página para informações de contato, parcerias ou sugestões
          de pauta.
        </p>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-lg text-gray-700">
            E-mail: contato@blogdocliente.com
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}