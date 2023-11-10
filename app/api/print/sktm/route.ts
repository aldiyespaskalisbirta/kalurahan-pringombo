import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const values = await req.json();
  try {
    const ortu = await prisma.penduduk.findUnique({
      where: {
        nik: values.nik_ortu,
      },
    });

    if (!ortu) {
      return new NextResponse("NIK Orang Tua Tidak Ditemukan", { status: 404 });
    }

    const anak = await prisma.penduduk.findUnique({
      where: {
        nik: values.nik_anak,
      },
    });

    if (!anak) {
      return new NextResponse("NIK Anak Tidak Ditemukan", { status: 404 });
    }

    const surat = await prisma.sKTM.findUnique({
      where: {
        no_surat: values.no_surat,
      },
    });

    if (surat) {
      return new NextResponse("Nomor Surat Sudah Ada", { status: 409 });
    }

    if (ortu.nokk != anak.nokk) {
      return new NextResponse("No KK Tidak Sesuai", { status: 406 });
    }

    const createSktm = await prisma.sKTM.create({
      data: {
        ...values,
      },
    });

    return NextResponse.json(createSktm);
  } catch (err) {
    console.log("[POST_SURAT_KETERANGAN_TIDAK_MAMPU]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
