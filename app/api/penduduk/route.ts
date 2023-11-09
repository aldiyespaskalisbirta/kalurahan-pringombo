import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  const penduduk = await prisma.penduduk.findMany();

  if (!penduduk) {
    return new NextResponse("No data found", { status: 404 });
  }
  await prisma.penduduk.deleteMany();
  return new NextResponse("Success deleted", { status: 200 });
}
