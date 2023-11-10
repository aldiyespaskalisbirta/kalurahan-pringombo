import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { nik: string } }
) {
  const values = await req.json();
  try {
    const penduduk = await prisma.penduduk.findUnique({
      where: {
        nik: params.nik,
      },
    });

    if (!penduduk) {
      return new NextResponse("NIK Tidak ditemukan", { status: 404 });
    }
    const createSuketUsaha = await prisma.suketUsaha.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(createSuketUsaha);
  } catch (err) {
    console.log("[POST_SURAT_KETERANGAN_USAHA]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
