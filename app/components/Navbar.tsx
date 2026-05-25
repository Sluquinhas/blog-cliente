import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100/80 backdrop-blur transition-colors dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-gray-950 transition-colors dark:text-white"
        >
          Blog do Cliente
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Início
          </Link>

          <Link
            href="/artigos"
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Artigos
          </Link>

          <Link
            href="/sobre"
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Sobre
          </Link>

          <Link
            href="/contato"
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Contato
          </Link>

          <ThemeToggle />

        </nav>
      </div>
    </header>
  );
}