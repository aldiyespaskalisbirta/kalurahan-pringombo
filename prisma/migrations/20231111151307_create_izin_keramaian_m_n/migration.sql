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
CREATE TABLE "IzinKeramaianPenduduk" (
    "pendudukId" TEXT NOT NULL,
    "izinKeramaiainId" TEXT NOT NULL,
    "sebagai" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IzinKeramaianPenduduk_pkey" PRIMARY KEY ("pendudukId","izinKeramaiainId")
);

-- AddForeignKey
ALTER TABLE "IzinKeramaianPenduduk" ADD CONSTRAINT "IzinKeramaianPenduduk_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinKeramaianPenduduk" ADD CONSTRAINT "IzinKeramaianPenduduk_izinKeramaiainId_fkey" FOREIGN KEY ("izinKeramaiainId") REFERENCES "IzinKeramaian"("no_surat") ON DELETE RESTRICT ON UPDATE CASCADE;
