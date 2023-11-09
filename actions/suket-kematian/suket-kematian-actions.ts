import { prisma } from "@/lib/prisma";

export async function getSuketKematianById(nik: string, no_surat: string) {
  const surat = await prisma.suketKematian.findUnique({
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

export async function getSuketKematian(nik: string) {
  const surat = await prisma.suketKematian.findFirst({
    where: {
      pendudukId: nik,
    },
  });

  if (!surat) {
    return null;
  }

  return surat;
}
