import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  const values = await req.json();
  try {
    const suket_kematian = await prisma.suketKematian.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!suket_kematian) {
      return new NextResponse("Surat Tidak Ditemukan", {
        status: 404,
      });
    }

    const update_suket_kematian = await prisma.suketKematian.update({
      where: {
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(update_suket_kematian), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_KETERANGAN_KEMATIAN_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  try {
    const suket_kematian = await prisma.suketKematian.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!suket_kematian) {
      return new NextResponse("Surat Tidak Ditemukan", {
        status: 404,
      });
    }
    await prisma.suketKematian.delete({
      where: {
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_KETERANGAN_KEMATIAN_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
