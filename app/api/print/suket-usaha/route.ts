import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const values = await req.json();
  try {
    const penduduk = await prisma.penduduk.findUnique({
      where: {
        nik: values.pendudukId,
      },
    });

    if (!penduduk) {
      return new NextResponse("NIK Tidak Ditemukan", { status: 404 });
    }
    const no_surat = await prisma.suketUsaha.findUnique({
      where: {
        no_surat: values.no_surat,
      },
    });

    if (no_surat) {
      return new NextResponse("Nomor Surat Sudah Ada", { status: 404 });
    }

    const createSuketUsaha = await prisma.suketUsaha.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(createSuketUsaha);
  } catch (err) {
    console.log("[POST_SURAT_KETERANGAN_USAHA]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
