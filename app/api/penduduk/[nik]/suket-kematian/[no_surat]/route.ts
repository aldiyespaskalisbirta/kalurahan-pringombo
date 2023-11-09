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

    const suketKematian = await prisma.suketKematian.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!suketKematian) {
      return new NextResponse("Surat Keterangan Kematian not found", {
        status: 404,
      });
    }

    const updateSuketKematian = await prisma.suketKematian.update({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(JSON.stringify(updateSuketKematian), {
      status: 200,
    });
  } catch (err) {
    console.log("[PATCH_SURAT_KETERANGAN_KEMATIAN_ID]", err);
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

    const suketKematian = await prisma.suketKematian.findUnique({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });

    if (!suketKematian) {
      return new NextResponse("Surat Keterangan Kematian not found", {
        status: 404,
      });
    }
    await prisma.suketKematian.delete({
      where: {
        pendudukId: params.nik,
        no_surat: params.no_surat,
      },
    });
    return new NextResponse("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_SURAT_KETERANGAN_KEMATIAN_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
