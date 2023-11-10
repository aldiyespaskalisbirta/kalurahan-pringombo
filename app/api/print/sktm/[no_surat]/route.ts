import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  const values = await req.json();
  try {
    const sktm = await prisma.sKTM.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!sktm) {
      return new NextResponse("Surat Tidak Ditemukan", {
        status: 404,
      });
    }

    const update_sktm = await prisma.sKTM.update({
      where: {
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(update_sktm), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_KETERANGAN_TIDAK_MAMPU_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  try {
    const sktm = await prisma.sKTM.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!sktm) {
      return new NextResponse("Surat Tidak Ditemukan", {
        status: 404,
      });
    }
    await prisma.sKTM.delete({
      where: {
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_KETERANGAN_TIDAK_MAMPU_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
