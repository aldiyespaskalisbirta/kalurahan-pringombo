import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  const values = await req.json();
  try {
    const suketUsaha = await prisma.suketUsaha.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!suketUsaha) {
      return new NextResponse("Surat Keterangan Usaha Tidak Ditemukan", {
        status: 404,
      });
    }

    const updateSuketUsaha = await prisma.suketUsaha.update({
      where: {
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(updateSuketUsaha), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_KETERANGAN_USAHA_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { nik: string; no_surat: string } }
) {
  try {
    const suketUsaha = await prisma.suketUsaha.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!suketUsaha) {
      return new NextResponse("Surat Keterangan Usaha Tidak Ditemukan", {
        status: 404,
      });
    }
    await prisma.suketUsaha.delete({
      where: {
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_KETERANGAN_USAHA_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
