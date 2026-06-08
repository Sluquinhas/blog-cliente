-- CreateTable
CREATE TABLE "Artigo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "tempoLeitura" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Rascunho',
    "imagemCapa" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Artigo_slug_key" ON "Artigo"("slug");
