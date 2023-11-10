"use server";

import { prisma } from "@/lib/prisma";

export async function getAllSuketUsaha() {
  const surat = await prisma.suketUsaha.findMany();

  if (!surat) {
    return null;
  }

  return surat;
}

export async function getSuketUsahaOwner(nik: string) {
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

export async function getSuketUsahaById(nik: string, no_surat: string) {
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
