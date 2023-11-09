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

    const sktm = await prisma.suketTidakMampu.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!sktm) {
      return new NextResponse("Surat Keterangan Tidak Mampu not found", {
        status: 404,
      });
    }

    const updateSktm = await prisma.suketTidakMampu.update({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(updateSktm), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_KETERANGAN_TIDAK_MAMPU_ID]", err);
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

    const sktm = await prisma.suketTidakMampu.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!sktm) {
      return new NextResponse("Surat Keterangan Tidak Mampu not found", {
        status: 404,
      });
    }
    await prisma.suketTidakMampu.delete({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_KETERANGAN_TIDAK_MAMPU_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
