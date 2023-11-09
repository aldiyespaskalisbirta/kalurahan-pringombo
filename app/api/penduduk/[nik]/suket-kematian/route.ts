import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { nik: string } }
) {
  const { no_surat } = await req.json();
  try {
    const createSuketKematian = await prisma.suketKematian.create({
      data: {
        pendudukId: params.nik,
        no_surat,
      },
    });

    return NextResponse.json(createSuketKematian);
  } catch (err) {
    console.log("[POST_SURAT_KETERANGAN_KEMATIAN]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
