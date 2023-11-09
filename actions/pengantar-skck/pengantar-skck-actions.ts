import { prisma } from "@/lib/prisma";

export async function getPengantarSkckById(nik: string, no_surat: string) {
  const surat = await prisma.pengantarSKCK.findUnique({
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

export async function getPengantarSkck(nik: string) {
  const surat = await prisma.pengantarSKCK.findFirst({
    where: {
      pendudukId: nik,
    },
  });

  if (!surat) {
    return null;
  }

  return surat;
}
