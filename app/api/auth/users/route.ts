import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();

  if (!users) {
    return new NextResponse("No user found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(users));
}


