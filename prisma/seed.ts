import { countAge } from "D:/COde/pringombo2/lib/count-age";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from "fs";
import { encodeData } from "D:/COde/pringombo2/lib/encrypt/encode";
async function upsertPenduduk(
  nik: string,
  nokk: string,
  nama: string,
  alias: string,
  agama: string,
  jenis_kelamin: string,
  kewarganegaraan: string,
  padukuhan: string,
  rt: number,
  rw: number,
  pendidikan_kk: string,
  pendidikan_sdt: string,
  pekerjaan: string,
  tanggal_lahir: Date,
  tempat_lahir: string,
  umur: number,
  status_kawin: string,
  shdk: string,
  gol_darah: string,
  nama_ayah: string,
  nama_ibu: string,
  jabatan_di_kalurahan: string,
  status_duk: string
) {
  return prisma.penduduk.upsert({
    where: { nik },
    update: { jabatan_di_kalurahan },
    create: {
      nik,
      nokk,
      nama,
      alias,
      agama,
      jenis_kelamin,
      kewarganegaraan,
      padukuhan,
      rt,
      rw,
      pendidikan_kk,
      pendidikan_sdt,
      pekerjaan,
      tanggal_lahir,
      tempat_lahir,
      umur,
      status_kawin,
      shdk,
      gol_darah,
      nama_ayah,
      nama_ibu,
      jabatan_di_kalurahan,
      status_duk,
    },
  });
}

async function main() {
  try {
    const jsonData = fs.readFileSync(
      "D:/COde/pringombo2/prisma/data_penduduk.json",
      "utf-8"
    );
    const data = JSON.parse(jsonData);

    for (const {
      nik,
      nokk,
      nama,
      alias,
      agama,
      jenis_kelamin,
      kewarganegaraan,
      padukuhan,
      rt,
      rw,
      pendidikan_kk,
      pendidikan_sdt,
      pekerjaan,
      tanggal_lahir,
      tempat_lahir,
      umur,
      status_kawin,
      shdk,
      gol_darah,
      nama_ayah,
      nama_ibu,
      jabatan_di_kalurahan,
      status_duk,
    } of data) {
      const encryptNik = encodeData(nik);

      let data_nokk = nokk;
      if (!data_nokk || data_nokk === "-") {
        data_nokk = null;
      } else {
        data_nokk = encodeData(nokk);
      }

      let data_padukuhan = padukuhan;
      if (!data_padukuhan || data_padukuhan === "-") {
        data_padukuhan = null;
      }

      let data_rt = rt;
      if (!data_rt || data_rt === "-") {
        data_rt = null;
      }

      let data_rw = rw;
      if (!data_rw || data_rw === "-") {
        data_rw = null;
      }

      let data_pendidikan_kk = pendidikan_kk;
      if (!data_pendidikan_kk || data_pendidikan_kk === "-") {
        data_pendidikan_kk = null;
      }

      let data_pendidikan_sdt = pendidikan_sdt;
      if (!data_pendidikan_sdt || data_pendidikan_sdt === "-") {
        data_pendidikan_sdt = null;
      }

      let data_pekerjaan = pekerjaan;
      if (!data_pekerjaan || data_pekerjaan === "-") {
        data_pekerjaan = null;
      }

      let data_tanggal_lahir = tanggal_lahir;
      if (!data_tanggal_lahir || data_tanggal_lahir === "-") {
        data_tanggal_lahir = null;
      } else {
        data_tanggal_lahir = new Date(data_tanggal_lahir);
      }

      let data_tempat_lahir = tempat_lahir;
      if (!data_tempat_lahir || data_tempat_lahir === "-") {
        data_tempat_lahir = null;
      }

      let data_umur = umur;
      if (!data_umur || data_umur === "-") {
        data_umur = null;
      } else {
        data_umur = countAge(data_umur);
      }

      let data_status_kawin = status_kawin;
      if (!data_status_kawin || data_status_kawin === "-") {
        data_status_kawin = null;
      }

      let data_shdk = shdk;
      if (!data_shdk || data_shdk === "-") {
        data_shdk = null;
      }

      let data_gol_darah = gol_darah;
      if (!data_gol_darah || data_gol_darah === "-") {
        data_gol_darah = null;
      }

      let data_nama_ayah = nama_ayah;
      if (!data_nama_ayah || data_nama_ayah === "-") {
        data_nama_ayah = null;
      }

      let data_nama_ibu = nama_ibu;
      if (!data_nama_ibu || data_nama_ibu === "-") {
        data_nama_ibu = null;
      }

      let data_status_duk = status_duk;
      if (!data_status_duk || data_status_duk === "-") {
        data_status_duk = null;
      } else {
        data_status_duk = data_status_duk.toUpperCase();
      }

      let data_jabatan_di_kalurahan = jabatan_di_kalurahan;
      if (nik === "3403116312720001") {
        data_jabatan_di_kalurahan = "LURAH";
      }
      if (nik === "3403111806890001") {
        data_jabatan_di_kalurahan = "CARIK";
      }
      if (nik === "3403110403690002") {
        data_jabatan_di_kalurahan = "JAGABAYA";
      }
      if (nik === "3403112509940002") {
        data_jabatan_di_kalurahan = "ULU ULU";
      }
      if (nik === "3403111910680001") {
        data_jabatan_di_kalurahan = "KAMITUA";
      }
      if (nik === "3403110203910001") {
        data_jabatan_di_kalurahan = "KAUR TATA LAKSANA";
      }
      if (nik === "3403111702830001") {
        data_jabatan_di_kalurahan = "KAUR DANARTA";
      }
      if (nik === "3403112505640001") {
        data_jabatan_di_kalurahan = "KAUR PANGRIPTO";
      }
      if (nik === "3403110907880001") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403111109740002") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "1802111201780005") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403110507710001") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403115204790001") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403110703800002") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403110806680001") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403111212930003") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403111502690001") {
        data_jabatan_di_kalurahan = "DUKUH";
      }
      if (nik === "3403112807650001") {
        data_jabatan_di_kalurahan = "DUKUH";
      }

      await upsertPenduduk(
        encryptNik,
        data_nokk,
        nama,
        alias,
        agama,
        jenis_kelamin,
        kewarganegaraan,
        data_padukuhan,
        data_rt,
        data_rw,
        data_pendidikan_kk,
        data_pendidikan_sdt,
        data_pekerjaan,
        data_tanggal_lahir,
        data_tempat_lahir,
        data_umur,
        data_status_kawin,
        data_shdk,
        data_gol_darah,
        data_nama_ayah,
        data_nama_ibu,
        data_jabatan_di_kalurahan,
        data_status_duk
      );
    }
  } catch (err) {
    console.error("[SEED_DATABASE]", err);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
