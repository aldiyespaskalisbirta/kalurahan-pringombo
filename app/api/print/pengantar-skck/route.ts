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

    const surat = await prisma.pengantarSKCK.findUnique({
      where: {
        no_surat: values.no_surat,
      },
    });

    if (surat) {
      return new NextResponse("Nomor Surat Sudah Ada", { status: 404 });
    }

    const create_pengantar_skck = await prisma.pengantarSKCK.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(create_pengantar_skck);
  } catch (err) {
    console.log("[POST_SURAT_PENGANTAR_SKCK]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
