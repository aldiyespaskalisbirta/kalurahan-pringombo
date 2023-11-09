import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { nik: string; no_surat: string } }
) {
  const values = await req.json();
  try {
    const penduduk = await prisma.penduduk.findUnique({
      where: {
        nik: params.nik,
      },
    });

    if (!penduduk) return new NextResponse("NIK not found", { status: 404 });

    const pengantarSkck = await prisma.pengantarSKCK.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!pengantarSkck) {
      return new NextResponse("Surat Pengantar SKCK not found", {
        status: 404,
      });
    }

    const updatePengantarSkck = await prisma.pengantarSKCK.update({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(updatePengantarSkck), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_PENGANTAR_SKCK_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { nik: string; no_surat: string } }
) {
  try {
    const penduduk = await prisma.penduduk.findUnique({
      where: {
        nik: params.nik,
      },
    });

    if (!penduduk) return new NextResponse("NIK not found", { status: 404 });

    const pengantarSkck = await prisma.pengantarSKCK.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!pengantarSkck) {
      return new NextResponse("Surat Pengantar SKCK not found", {
        status: 404,
      });
    }
    await prisma.pengantarSKCK.delete({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_PENGANTAR_SKCK_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
