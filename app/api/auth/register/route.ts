import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed_password,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.log("[REGISTER]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
