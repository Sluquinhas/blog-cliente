"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { verifySession } from "../../lib/dal";

const CATEGORIAS = [
  "Economia",
  "Mercado Financeiro",
  "Investimentos",
  "Finanças Pessoais",
] as const;

function gerarSlug(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Garante um slug único acrescentando um sufixo numérico quando necessário.
async function gerarSlugUnico(titulo: string): Promise<string> {
  const base = gerarSlug(titulo) || "artigo";
  let slug = base;
  let n = 2;

  while (await prisma.artigo.findUnique({ where: { slug } })) {
    slug = `${base}-${n}`;
    n += 1;
  }

  return slug;
}

// Normaliza datas vindas do input type="date" (YYYY-MM-DD) para PT-BR.
function formatarData(valor: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor.trim());
  if (!m) return valor.trim();

  const data = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(data);
}

function normalizarTempoLeitura(valor: string): string {
  const v = valor.trim();
  if (!v) return "Leitura rápida";
  return /leitura/i.test(v) ? v : `${v} de leitura`;
}

function lerCampos(formData: FormData) {
  const categoria = String(formData.get("categoria") ?? "Economia");

  return {
    titulo: String(formData.get("titulo") ?? "").trim(),
    categoria: (CATEGORIAS as readonly string[]).includes(categoria)
      ? categoria
      : "Economia",
    autor: String(formData.get("autor") ?? "").trim() || "Raimundo Padilha",
    data: formatarData(String(formData.get("data") ?? "")),
    tempoLeitura: normalizarTempoLeitura(
      String(formData.get("tempoLeitura") ?? "")
    ),
    resumo: String(formData.get("resumo") ?? "").trim(),
    conteudo: String(formData.get("conteudo") ?? "").trim(),
    imagemCapa: String(formData.get("imagemCapa") ?? "").trim() || null,
    status: String(formData.get("status") ?? "Publicado") === "Rascunho"
      ? "Rascunho"
      : "Publicado",
  };
}

export async function criarArtigo(formData: FormData) {
  await verifySession();

  const campos = lerCampos(formData);
  if (!campos.titulo || !campos.resumo || !campos.conteudo) {
    throw new Error("Preencha título, resumo e conteúdo.");
  }

  const slug = await gerarSlugUnico(campos.titulo);

  await prisma.artigo.create({
    data: { ...campos, slug },
  });

  revalidatePath("/");
  revalidatePath("/artigos");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function atualizarArtigo(formData: FormData) {
  await verifySession();

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) {
    throw new Error("Artigo inválido.");
  }

  const existente = await prisma.artigo.findUnique({ where: { id } });
  if (!existente) {
    throw new Error("Artigo não encontrado.");
  }

  const campos = lerCampos(formData);
  if (!campos.titulo || !campos.resumo || !campos.conteudo) {
    throw new Error("Preencha título, resumo e conteúdo.");
  }

  // O slug permanece estável para não quebrar links já publicados.
  await prisma.artigo.update({
    where: { id },
    data: campos,
  });

  revalidatePath("/");
  revalidatePath("/artigos");
  revalidatePath("/admin");
  revalidatePath(`/artigos/${existente.slug}`);
  redirect("/admin");
}

export async function excluirArtigo(formData: FormData) {
  await verifySession();

  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) {
    throw new Error("Artigo inválido.");
  }

  const existente = await prisma.artigo.findUnique({ where: { id } });
  if (existente) {
    await prisma.artigo.delete({ where: { id } });
    revalidatePath(`/artigos/${existente.slug}`);
  }

  revalidatePath("/");
  revalidatePath("/artigos");
  revalidatePath("/admin");
}

export async function listarArtigos() {
  return prisma.artigo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function buscarArtigoPorSlug(slug: string) {
  return prisma.artigo.findUnique({
    where: {
      slug,
    },
  });
}

export async function buscarArtigoPorId(id: number) {
  return prisma.artigo.findUnique({
    where: {
      id,
    },
  });
}
