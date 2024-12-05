import { NextResponse } from "next/server";

import db from "@/lib/db";
import { secondaryFormSchema } from "@/lib/types/forms";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const newData = secondaryFormSchema.parse(body);

    const existingSecondaryById = await db.k72623_lo.findUnique({ 
      where: {
        deduplicationId: newData.deduplicationId
      }
    });

    if (existingSecondaryById) 
      return NextResponse.json("UUID already exists", { status: 400 });

    await db.nit2xli.create({
      data: {
        ...newData
      }
    });

    return NextResponse.json("Secondary created successfully", { status: 201 });

  } catch (error) {
    console.log("[NEWSECONDARY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};