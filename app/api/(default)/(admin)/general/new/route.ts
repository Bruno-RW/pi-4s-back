import { NextResponse } from "next/server";

import db from "@/lib/db";
import { generalFormSchema } from "@/lib/types/forms";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const newData = generalFormSchema.parse(body);

    const existingGeneralById = await db.nit2xli.findUnique({ 
      where: {
        deduplicationId: newData.deduplicationId
      }
    });

    if (existingGeneralById) 
      return NextResponse.json("UUID already exists", { status: 400 });

    await db.nit2xli.create({
      data: {
        ...newData
      }
    });

    return NextResponse.json("General created successfully", { status: 201 });

  } catch (error) {
    console.log("[NEWGENERAL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};