"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-100/80 backdrop-blur transition-colors dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-gray-950 transition-colors dark:text-white"
          >
            Blog do Cliente
          </Link>

          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            className="rounded-lg border border-gray-300 px-4 py-2 font-bold transition hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 md:hidden"
          >
            {menuAberto ? "✕" : "☰"}
          </button>

          <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-3 py-2 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Início
            </Link>

            <Link
              href="/artigos"
              className="rounded-lg border border-gray-300 px-3 py-2 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Artigos
            </Link>

            <Link
              href="/sobre"
              className="rounded-lg border border-gray-300 px-3 py-2 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              className="rounded-lg border border-gray-300 px-3 py-2 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Contato
            </Link>

            <ThemeToggle />
          </nav>
        </div>

        {menuAberto && (
          <nav className="mt-5 grid gap-3 text-sm font-medium md:hidden">
            <Link
              href="/"
              onClick={() => setMenuAberto(false)}
              className="rounded-lg border border-gray-300 px-4 py-3 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Início
            </Link>

            <Link
              href="/artigos"
              onClick={() => setMenuAberto(false)}
              className="rounded-lg border border-gray-300 px-4 py-3 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Artigos
            </Link>

            <Link
              href="/sobre"
              onClick={() => setMenuAberto(false)}
              className="rounded-lg border border-gray-300 px-4 py-3 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Sobre
            </Link>

            <Link
              href="/contato"
              onClick={() => setMenuAberto(false)}
              className="rounded-lg border border-gray-300 px-4 py-3 text-center transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              Contato
            </Link>

            <ThemeToggle />
          </nav>
        )}
      </div>
    </header>
  );
}