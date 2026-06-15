import { logout } from "../actions/auth";

// Estilo usado nas páginas de formulário (novo/editar/visualizar).
const ESTILO_PADRAO =
  "rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-white dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800";

export default function LogoutButton({
  className = ESTILO_PADRAO,
}: {
  className?: string;
}) {
  return (
    <form action={logout}>
      <button type="submit" className={className}>
        Sair
      </button>
    </form>
  );
}
