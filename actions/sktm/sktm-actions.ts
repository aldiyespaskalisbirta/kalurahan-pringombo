import { prisma } from "@/lib/prisma";

export async function getAllSktm(nik: string) {
  const surat = await prisma.suketTidakMampu.findMany({
    where: {
      pendudukId: nik,
    },
  });

  if (!surat) {
    return null;
  }

  return surat;
}

export async function getSktmById(nik: string, no_surat: string) {
  const surat = await prisma.suketTidakMampu.findUnique({
    where: {
      no_surat,
      pendudukId: nik,
    },
  });

  if (!surat) {
    return null;
  }

  return surat;
}
