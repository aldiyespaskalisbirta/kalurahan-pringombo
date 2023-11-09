import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { email, password } = await req.json();

  const isUserEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserEmail) {
    return new NextResponse(JSON.stringify("Email is not available"), {
      status: 404,
    });
  }

  
}
