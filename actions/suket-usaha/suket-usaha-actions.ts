import { prisma } from "@/lib/prisma";

export async function getAllSuketUsaha(nik: string) {
  const surat = await prisma.suketUsaha.findMany({
    where: {
      pendudukId: nik,
    },
  });

  if (!surat) {
    return null;
  }

  return surat;
}

export async function getSuektUsahaById(nik: string, no_surat: string) {
  const surat = await prisma.suketUsaha.findUnique({
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
