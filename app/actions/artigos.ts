"use server";

import { prisma } from "../../lib/prisma";

function gerarSlug(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function criarArtigo(formData: FormData) {
  const titulo = String(formData.get("titulo"));
  const categoria = String(formData.get("categoria"));
  const autor = String(formData.get("autor"));
  const data = String(formData.get("data"));
  const tempoLeitura = String(formData.get("tempoLeitura"));
  const resumo = String(formData.get("resumo"));
  const conteudo = String(formData.get("conteudo"));
  const status = String(formData.get("status") || "Publicado");

  const slug = gerarSlug(titulo);

  await prisma.artigo.create({
    data: {
      titulo,
      slug,
      categoria,
      autor,
      data,
      tempoLeitura,
      resumo,
      conteudo,
      status,
    },
  });
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