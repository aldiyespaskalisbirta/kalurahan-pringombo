import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { nik: string } }
) {
  const { no_surat } = await req.json();
  try {
    const createPengantarSkck = await prisma.pengantarSKCK.create({
      data: {
        pendudukId: params.nik,
        no_surat,
      },
    });

    return NextResponse.json(createPengantarSkck);
  } catch (err) {
    console.log("[POST_SURAT_PENGANTAR_SKCK]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
