"use server";

import { prisma } from "@/lib/prisma";

export async function getAllSuketKematian() {
  const surat = await prisma.suketKematian.findMany();

  if (!surat) {
    return null;
  }

  return surat;
}

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
