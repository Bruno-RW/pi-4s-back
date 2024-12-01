import { NextResponse } from "next/server";
import { compare, hash } from "bcrypt";

import db from "@/lib/db";
import { editUserFormSchema } from "@/lib/types/forms";

export async function GET(
  req: Request,
  {params}: {params: {userId: string}}
) {
  try {
    if (!Number(params.userId)) return new NextResponse("User ID must be a number", { status: 400 });
    
    const user = await db.user.findUnique({ where: {id: Number(params.userId)} });

    if (!user) return NextResponse.json("Invalid user ID", { status: 400 });

    return NextResponse.json(user);

  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  {params}: {params: {userId: string}}
) {
  try {
    const body: unknown = await req.json();
    const { name, email, type, password } = editUserFormSchema.parse(body);

    const existingUserById = await db.user.findUnique({ where: { id: Number(params.userId) } });

    if (!existingUserById) 
      return NextResponse.json("User does not exist", { status: 400 });

    const existingUserByEmail = await db.user.findUnique({ where: { email } });

    if (existingUserByEmail && existingUserByEmail.id !== existingUserById.id) 
      return NextResponse.json("E-mail is already taken", { status: 400 });

    if (!password) {
      await db.user.update({
        where: { email },
        data: {
          name,
          email,
          type,
        }
      });

      return NextResponse.json("Admin user updated successfully", { status: 201 });
    }

    const isSamePassword = await compare(password, existingUserById.password);

    if (isSamePassword)
      return NextResponse.json("New password must be different than the current password", { status: 400 });

    const newHashedPassword = await hash(password, 10);

    await db.user.update({
      where: { email },
      data: {
        name,
        email,
        type,
        password: newHashedPassword,
      }
    });

    return NextResponse.json("Admin user updated successfully", { status: 201 });

  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  {params}: {params: {userId: string}}
) {
  try {
    if (!Number(params.userId)) return new NextResponse("User ID must be a number", { status: 400 });
    
    const user = await db.user.findUnique({ where: {id: Number(params.userId)} });

    if (!user) return NextResponse.json("Invalid user ID", { status: 400 });

    const deletedUser = await db.user.delete({ where: {id: Number(params.userId)} });

    return NextResponse.json(deletedUser);

  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};