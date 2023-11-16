-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penduduk" (
    "nik" TEXT NOT NULL,
    "nokk" TEXT,
    "nama" TEXT NOT NULL,
    "alias" TEXT,
    "agama" TEXT,
    "jenis_kelamin" TEXT,
    "kewarganegaraan" TEXT NOT NULL DEFAULT 'INDONESIA',
    "padukuhan" TEXT,
    "rt" INTEGER,
    "rw" INTEGER,
    "pendidikan_kk" TEXT,
    "pendidikan_sdt" TEXT,
    "pekerjaan" TEXT,
    "tanggal_lahir" TIMESTAMP(3),
    "tempat_lahir" TEXT,
    "umur" INTEGER,
    "status_kawin" TEXT,
    "shdk" TEXT,
    "gol_darah" TEXT,
    "nama_ayah" TEXT,
    "nama_ibu" TEXT,
    "jabatan_di_kalurahan" TEXT NOT NULL DEFAULT 'PENDUDUK',
    "status_duk" TEXT,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "paukuhan" (
    "dukuh_id" TEXT NOT NULL,
    "nama_padukuhan" TEXT NOT NULL,
    "nama_dukuh" TEXT NOT NULL,
    "struktu_desa" TEXT NOT NULL,

    CONSTRAINT "paukuhan_pkey" PRIMARY KEY ("dukuh_id")
);

-- CreateTable
CREATE TABLE "SuketUsaha" (
    "no_surat" TEXT NOT NULL,
    "usaha_sampingan" TEXT,
    "di_kalurahan" TEXT,
    "di_kapenawon" TEXT,
    "di_kabupaten" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pendudukId" TEXT NOT NULL,

    CONSTRAINT "SuketUsaha_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "SuketKematian" (
    "no_surat" TEXT NOT NULL,
    "pendudukId" TEXT NOT NULL,
    "lokasi_meninggal" TEXT,
    "tanggal_kematian" TIMESTAMP(3),
    "anak_ke" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuketKematian_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "PengantarSKCK" (
    "no_surat" TEXT NOT NULL,
    "pendudukId" TEXT NOT NULL,
    "keperluan" TEXT,
    "no_polisi" TEXT,
    "no_reg_pok" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PengantarSKCK_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "SKTM" (
    "no_surat" TEXT NOT NULL,
    "nik_ortu" TEXT NOT NULL,
    "nik_anak" TEXT NOT NULL,
    "nama_instansi" TEXT,
    "fakultas_prodi" TEXT,
    "kelas_semester" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SKTM_pkey" PRIMARY KEY ("no_surat")
);

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
CREATE TABLE "IzinKeramaianOnPenduduk" (
    "pendudukId" TEXT NOT NULL,
    "izinKeramaianId" TEXT NOT NULL,
    "sebagai" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IzinKeramaianOnPenduduk_pkey" PRIMARY KEY ("pendudukId","izinKeramaianId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuketKematian_pendudukId_key" ON "SuketKematian"("pendudukId");

-- CreateIndex
CREATE UNIQUE INDEX "PengantarSKCK_pendudukId_key" ON "PengantarSKCK"("pendudukId");

-- AddForeignKey
ALTER TABLE "SuketUsaha" ADD CONSTRAINT "SuketUsaha_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuketKematian" ADD CONSTRAINT "SuketKematian_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengantarSKCK" ADD CONSTRAINT "PengantarSKCK_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKTM" ADD CONSTRAINT "SKTM_nik_ortu_fkey" FOREIGN KEY ("nik_ortu") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinKeramaianOnPenduduk" ADD CONSTRAINT "IzinKeramaianOnPenduduk_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("nik") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IzinKeramaianOnPenduduk" ADD CONSTRAINT "IzinKeramaianOnPenduduk_izinKeramaianId_fkey" FOREIGN KEY ("izinKeramaianId") REFERENCES "IzinKeramaian"("no_surat") ON DELETE RESTRICT ON UPDATE CASCADE;
