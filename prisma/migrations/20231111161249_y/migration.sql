/*
  Warnings:

  - You are about to drop the `IzinKeramaianPenduduk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuratIzinKeramaian` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IzinKeramaianPenduduk" DROP CONSTRAINT "IzinKeramaianPenduduk_pendudukId_fkey";

-- DropForeignKey
ALTER TABLE "IzinKeramaianPenduduk" DROP CONSTRAINT "IzinKeramaianPenduduk_suratIzinKeramaianId_fkey";

-- DropTable
DROP TABLE "IzinKeramaianPenduduk";

-- DropTable
DROP TABLE "SuratIzinKeramaian";

-- CreateTable
CREATE TABLE "IzinKeramaian" (
    "no_surat" TEXT NOT NULL,
    "jenis_keramaian" TEXT,
    "keperluan" TEXT,
    "tempat_keramaian" TEXT,
    "tanggal_keramaian" TIMESTAMP(3),
    "waktu_keramaian" TEXT,
    "lama_keramaian" TEXT,

    CONSTRAINT "IzinKeramaian_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "_IzinKeramaianToPenduduk" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IzinKeramaianToPenduduk_AB_unique" ON "_IzinKeramaianToPenduduk"("A", "B");

-- CreateIndex
CREATE INDEX "_IzinKeramaianToPenduduk_B_index" ON "_IzinKeramaianToPenduduk"("B");

-- AddForeignKey
ALTER TABLE "_IzinKeramaianToPenduduk" ADD CONSTRAINT "_IzinKeramaianToPenduduk_A_fkey" FOREIGN KEY ("A") REFERENCES "IzinKeramaian"("no_surat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IzinKeramaianToPenduduk" ADD CONSTRAINT "_IzinKeramaianToPenduduk_B_fkey" FOREIGN KEY ("B") REFERENCES "Penduduk"("nik") ON DELETE CASCADE ON UPDATE CASCADE;
