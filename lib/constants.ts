// Constantes compartilhadas entre páginas, metadata e server actions.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://padilha.com.br";

// Sugestões de categoria exibidas no painel. O admin pode escolher uma destas
// ou digitar um assunto novo — a lista não limita o que pode ser salvo.
export const CATEGORIAS = [
  "Economia",
  "Mercado Financeiro",
  "Investimentos",
  "Finanças Pessoais",
  "Educação Financeira",
  "Empreendedorismo",
  "Negócios",
  "Política Econômica",
  "Economia Internacional",
  "Criptomoedas",
  "Aposentadoria",
  "Impostos",
];
