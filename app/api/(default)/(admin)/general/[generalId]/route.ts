import { NextResponse } from "next/server";

import db from "@/lib/db";
import { generalFormSchema } from "@/lib/types/forms";

export async function GET(
  req: Request,
  {params}: {params: {generalId: string}}
) {
  try {
    if (!String(params.generalId)) return new NextResponse("General UUID must be a string", { status: 400 });
    
    const general = await db.nit2xli.findUnique({ where: {deduplicationId: params.generalId} });

    if (!general) return NextResponse.json("Invalid general UUID", { status: 400 });

    return NextResponse.json(general);

  } catch (error) {
    console.log("[GENERAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  {params}: {params: {generalId: string}}
) {
  try {
    const body: unknown = await req.json();
    const newData = generalFormSchema.parse(body);

    const existingGeneralById = await db.nit2xli.findUnique({ where: { deduplicationId: params.generalId } });

    if (!existingGeneralById) 
      return NextResponse.json("General does not exist", { status: 400 });

    await db.nit2xli.update({
      where: { 
        deduplicationId: newData.deduplicationId
      },
      data: {
        ...newData
      }
    });

    return NextResponse.json("General updated successfully", { status: 201 });

  } catch (error) {
    console.log("[GENERAL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  {params}: {params: {generalId: string}}
) {
  try {
    if (!String(params.generalId)) return new NextResponse("General UUID must be a string", { status: 400 });
    
    const general = await db.nit2xli.findUnique({ where: {deduplicationId: params.generalId} });

    if (!general) return NextResponse.json("Invalid general UUID", { status: 400 });

    const deletedGeneral = await db.nit2xli.delete({ where: {deduplicationId: params.generalId} });

    return NextResponse.json(deletedGeneral);

  } catch (error) {
    console.log("[GENERAL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};