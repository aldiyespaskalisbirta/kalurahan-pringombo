import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  const values = await req.json();
  try {
    const pengantar_skck = await prisma.pengantarSKCK.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!pengantar_skck) {
      return new NextResponse("Surat Pengantar SKCK Tidak Ditemukan", {
        status: 404,
      });
    }

    const update_pengantar_skck = await prisma.pengantarSKCK.update({
      where: {
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(update_pengantar_skck), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_PENGANTAR_SKCK_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { no_surat: string } }
) {
  try {
    const pengantar_skck = await prisma.pengantarSKCK.findUnique({
      where: {
        no_surat: params.no_surat,
      },
    });

    if (!pengantar_skck) {
      return new NextResponse("Surat Pengantar SKCK Tidak Ditemukan", {
        status: 404,
      });
    }
    await prisma.pengantarSKCK.delete({
      where: {
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_PENGANTAR_SKCK_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
