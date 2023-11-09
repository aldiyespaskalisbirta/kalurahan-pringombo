export type SuketUsahaTypes = {
  nik: string;
  nama: string;
  alias: string | null;
  padukuhan: string | null;
  rt: number | null;
  rw: number | null;
  pekerjaan: string | null;
  tanggal_lahir: Date | null;
  tempat_lahir: string | null;
  suket_usaha: SuketUsaha[] | null;
};
type SuketUsaha = {
  no_surat: string;
  pendudukId: string;
  usaha_sampingan: string | null;
  di_kalurahan: string | null;
  di_kapenawon: string | null;
  di_kabupaten: string | null;
  createdAt: Date;
  updatedAt: Date;
};
