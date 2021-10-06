-- CreateTable
CREATE TABLE "Anuncio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ano_fabricacao" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "versao" TEXT NOT NULL,
    "numero_portas" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "cores_internas" TEXT NOT NULL,
    "combustivel" TEXT NOT NULL,
    "carroceria" TEXT NOT NULL,
    "potencia" TEXT NOT NULL,
    "transmissao" TEXT NOT NULL,
    "quilometragem" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "chave_copia" TEXT NOT NULL,
    "laudo_cautelar" TEXT NOT NULL,
    "manual_do_proprietario" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "data_de_criacao" DATETIME NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Anuncio_id_key" ON "Anuncio"("id");
