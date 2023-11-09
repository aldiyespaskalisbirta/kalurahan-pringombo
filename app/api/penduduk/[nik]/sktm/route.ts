import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { nik: string } }
) {
  const { no_surat } = await req.json();
  try {
    const createSktm = await prisma.suketTidakMampu.create({
      data: {
        pendudukId: params.nik,
        no_surat,
      },
    });

    return NextResponse.json(createSktm);
  } catch (err) {
    console.log("[POST_SURAT_KETERANGAN_TIDAK_MAMPU]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
