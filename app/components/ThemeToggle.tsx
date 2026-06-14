"use client";

import { useSyncExternalStore } from "react";

// Lê o tema atual diretamente do DOM (classe .dark no <html>), de forma
// reativa, sem setState dentro de efeito. A classe inicial é definida pelo
// script anti-FOUC no layout, antes da primeira pintura.
function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white hover:text-black dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      {dark ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
}
