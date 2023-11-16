/*
  Warnings:

  - The primary key for the `IzinKeramaianPenduduk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `izinKeramaiainId` on the `IzinKeramaianPenduduk` table. All the data in the column will be lost.
  - You are about to drop the `IzinKeramaian` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `suratIzinKeramaianId` to the `IzinKeramaianPenduduk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IzinKeramaianPenduduk" DROP CONSTRAINT "IzinKeramaianPenduduk_izinKeramaiainId_fkey";

-- AlterTable
ALTER TABLE "IzinKeramaianPenduduk" DROP CONSTRAINT "IzinKeramaianPenduduk_pkey",
DROP COLUMN "izinKeramaiainId",
ADD COLUMN     "suratIzinKeramaianId" TEXT NOT NULL,
ADD CONSTRAINT "IzinKeramaianPenduduk_pkey" PRIMARY KEY ("pendudukId", "suratIzinKeramaianId");

-- DropTable
DROP TABLE "IzinKeramaian";

-- CreateTable
CREATE TABLE "SuratIzinKeramaian" (
    "no_surat" TEXT NOT NULL,
    "jenis_keramaian" TEXT,
    "keperluan" TEXT,
    "tempat_keramaian" TEXT,
    "tanggal_keramaian" TIMESTAMP(3),
    "waktu_keramaian" TEXT,
    "lama_keramaian" TEXT,

    CONSTRAINT "SuratIzinKeramaian_pkey" PRIMARY KEY ("no_surat")
);

-- AddForeignKey
ALTER TABLE "IzinKeramaianPenduduk" ADD CONSTRAINT "IzinKeramaianPenduduk_suratIzinKeramaianId_fkey" FOREIGN KEY ("suratIzinKeramaianId") REFERENCES "SuratIzinKeramaian"("no_surat") ON DELETE RESTRICT ON UPDATE CASCADE;
