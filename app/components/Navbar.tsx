import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-gray-950"
        >
          Blog do Cliente
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-gray-700">
  <Link
    href="/"
    className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black"
  >
    Início
  </Link>

  <Link
    href="/artigos"
    className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black"
  >
    Artigos
  </Link>

  <Link
    href="/contato"
    className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black"
  >
    Contato
  </Link>
</nav>
      </div>
    </header>
  );
}