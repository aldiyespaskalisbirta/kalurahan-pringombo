"use server";

import { prisma } from "@/lib/prisma";
import { Individu } from "@/types/penduduk";

export async function GetAllPenduduk() {
  const penduduk = await prisma.penduduk.findMany();
  if (!penduduk) {
    return null;
  }
  return penduduk;
}

export async function getPendudukById(nik: string) {
  const penduduk = await prisma.penduduk.findUnique({
    where: {
      nik,
    },
  });
  if (!penduduk) {
    return null;
  }
  const data: Individu = penduduk;
  return data;
}

export async function getPerangkatKalurahan(jabatan: string) {
  const data = await prisma.penduduk.findFirst({
    where: {
      jabatan_di_kalurahan: jabatan,
    },
  });

  if (!data) {
    return null;
  }

  return data;
}

export async function getDataAyah(nokk: string, nama: string) {
  const data = await prisma.penduduk.findFirst({
    where: {
      nokk,
      nama_ayah: nama,
    },
  });

  if (!data) {
    return null;
  }
  return data;
}

export async function getDataIbu(nokk: string, nama: string) {
  const data = await prisma.penduduk.findFirst({
    where: {
      nokk,
      nama_ibu: nama,
    },
  });

  if (!data) {
    return null;
  }
  return data;
}

export async function getDataKeluarga(nokk: string) {
  const data = await prisma.penduduk.findMany({
    where: {
      nokk,
    },
  });

  if (!data) {
    return null;
  }
  return data;
}
