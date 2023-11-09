import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { nik: string } }
) {
  try {
    const values = await req.json();

    const individu = await prisma.penduduk.findUnique({
      where: {
        nik: params.nik,
      },
    });

    if (!individu)
      return new NextResponse("NIK not found", {
        status: 404,
      });

    const updateData = await prisma.penduduk.update({
      where: {
        nik: params.nik,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(updateData, { status: 200 });
  } catch (err) {
    console.log("[PATCH_PENDUDUK_ID]", err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { nik: string } }
) {
  try {
    const individu = await prisma.penduduk.findUnique({
      where: {
        nik: params.nik,
      },
    });
    if (!individu) {
      return new NextResponse("NIK not found", { status: 404 });
    }
    await prisma.penduduk.delete({
      where: {
        nik: params.nik,
      },
    });
    return NextResponse.json("Success deleted", { status: 200 });
  } catch (err) {
    console.log("[DELETE_PENDUDUK_ID]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
