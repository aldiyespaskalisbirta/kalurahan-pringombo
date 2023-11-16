import { prisma } from "@/lib/prisma";

// export async function createIzinKeramaian(nik: string) {
//   try {
//     const create = await prisma.izinKeramaian.create({
//       data: {
//         no_surat: "TEST NOMOR SURAT 2",
//         jenis_keramaian: "TEST JENIS KERAMAIAN 2",
//         keperluan: "TEST KEPERLUAN 2",
//         tempat_keramaian: "TEST TEMPAT KERAMAIAN 2",
//         tanggal_keramaian: new Date(),
//         waktu_keramaian: "TEST WAKtu KERAMAIAN 2",
//         lama_keramaian: "TEST LAMA KERAMAIAN 2",
//         penduduk: {
//           create: {
//             sebagai: "SAKSI",
//             penduduk: {
//               connect: {
//                 nik: nik,
//               },
//             },
//           },
//         },
//       },
//     });
//     console.log("[CREATE_IZIN_KERAMAIAN]", create);
//   } catch (err) {
//     console.log("[CREATE_IZIN_KERAMAIAN]", err);
//   }
// }

export async function createIzinKeramaian(nik: string, no_surat: string) {
  try {
    const existingPermit = await prisma.izinKeramaian.findFirst({
      where: {
        no_surat: no_surat,
      },
    });

    if (existingPermit) {
      // If the permit already exists, associate the new resident with the existing permit
      const createPenduduk = await prisma.izinKeramaianOnPenduduk.create({
        data: {
          pendudukId: nik,
          izinKeramaianId: no_surat,
          sebagai: "PEMILIK",
        },
      });
      console.log("[CREATE_PENDUDUK]", createPenduduk);
    } else {
      // If the permit doesn't exist, create a new permit and associate the resident with it
      const createIzinKeramaian = await prisma.izinKeramaian.create({
        data: {
          no_surat: no_surat,
          jenis_keramaian: "TEST JENIS KERAMAIAN 2",
          keperluan: "TEST KEPERLUAN 2",
          tempat_keramaian: "TEST TEMPAT KERAMAIAN 2",
          tanggal_keramaian: new Date(),
          waktu_keramaian: "TEST WAKtu KERAMAIAN 2",
          lama_keramaian: "TEST LAMA KERAMAIAN 2",
          penduduk: {
            create: {
              pendudukId: nik,
              sebagai: "PEMILIK",
            },
          },
        },
      });
      console.log("[CREATE_IZIN_KERAMAIAN]", createIzinKeramaian);
    }
  } catch (err) {
    console.log("[CREATE_IZIN_KERAMAIAN]", err);
  }
}

export async function getAllIzinKeramaian() {
  const surat = await prisma.izinKeramaian.findMany({
    where: {
      no_surat: "SURAT IZIN KERAMAIAN 3",
    },
    include: {
      penduduk: {
        where: {
          sebagai: "SAKSI",
        },
      },
    },
  });
  if (!surat) {
    return null;
  }
  return surat;
}
