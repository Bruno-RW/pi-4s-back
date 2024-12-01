import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import db from "@/lib/db";
import { userFormSchema } from "@/lib/types/forms";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const { name, email, type, password } = userFormSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({ where: { email } });

    if (existingUserByEmail) 
      return NextResponse.json("E-mail already exists", { status: 400 });

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        password: hashedPassword,
        name,
        email,
        type,
      }
    });

    return NextResponse.json("Admin user created successfully", { status: 201 });

  } catch (error) {
    console.log("[NEWUSER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};