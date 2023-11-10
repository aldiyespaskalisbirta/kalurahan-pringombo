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
      return new NextResponse("NIK Orang Tua Tidak Ditemukan", { status: 404 });
    }

    const surat = await prisma.suketKematian.findUnique({
      where: {
        no_surat: values.no_surat,
      },
    });

    if (surat) {
      return new NextResponse("Nomor Surat Sudah Ada", { status: 409 });
    }

    const create_suket_kematian = await prisma.suketKematian.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(create_suket_kematian);
  } catch (err) {
    console.log("[POST_SURAT_KETERANGAN_TIDAK_MAMPU]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
