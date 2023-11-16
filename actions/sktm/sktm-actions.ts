// "use server";

// import { prisma } from "@/lib/prisma";

// export async function getAllSktm() {
//   const surat = await prisma.sKTM.findMany();

//   if (!surat) {
//     return null;
//   }

//   return surat;
// }

// export async function getSktmOwner(nik_ortu: string) {
//   const surat = await prisma.sKTM.findMany({
//     where: {
//       nik_ortu: nik_ortu,
//     },
//   });

//   if (!surat) {
//     return null;
//   }

//   return surat;
// }

// export async function getSktmById(nik_ortu: string, no_surat: string) {
//   const surat = await prisma.sKTM.findUnique({
//     where: {
//       no_surat,
//       nik_ortu: nik_ortu,
//     },
//   });

//   if (!surat) {
//     return null;
//   }

//   return surat;
// }
