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

    const suketUsaha = await prisma.suketUsaha.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!suketUsaha) {
      return new NextResponse("Surat Keterangan Usaha not found", {
        status: 404,
      });
    }

    const updateSuketUsaha = await prisma.suketUsaha.update({
      where: {
        pendudukId: params.nik,
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
    const penduduk = await prisma.penduduk.findUnique({
      where: {
        nik: params.nik,
      },
    });

    if (!penduduk) return new NextResponse("NIK not found", { status: 404 });

    const suketUsaha = await prisma.suketUsaha.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!suketUsaha) {
      return new NextResponse("Surat Keterangan Usaha not found", {
        status: 404,
      });
    }
    await prisma.suketUsaha.delete({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_KETERANGAN_USAHA_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
