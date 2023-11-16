/*
  Warnings:

  - You are about to drop the `_IzinKeramaianToPenduduk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IzinKeramaianToPenduduk" DROP CONSTRAINT "_IzinKeramaianToPenduduk_A_fkey";

-- DropForeignKey
ALTER TABLE "_IzinKeramaianToPenduduk" DROP CONSTRAINT "_IzinKeramaianToPenduduk_B_fkey";

-- DropTable
DROP TABLE "_IzinKeramaianToPenduduk";

-- CreateTable
CREATE TABLE "IzinKeramaianOnPenduduk" (
    "pendudukId" TEXT NOT NULL,
    "izinKeramaianId" TEXT NOT NULL,
    "sebagai" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IzinKeramaianOnPenduduk_pkey" PRIMARY KEY ("pendudukId","izinKeramaianId")
);

-- AddForeignKey
ALTER TABLE "IzinKeramaianOnPenduduk" ADD CONSTRAINT "IzinKeramaianOnPenduduk_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinKeramaianOnPenduduk" ADD CONSTRAINT "IzinKeramaianOnPenduduk_izinKeramaianId_fkey" FOREIGN KEY ("izinKeramaianId") REFERENCES "IzinKeramaian"("no_surat") ON DELETE RESTRICT ON UPDATE CASCADE;
