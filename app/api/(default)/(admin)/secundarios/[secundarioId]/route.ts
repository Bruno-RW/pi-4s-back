import { NextResponse } from "next/server";

import db from "@/lib/db";
import { secondaryFormSchema } from "@/lib/types/forms";

export async function GET(
  {params}: {params: {secundarioId: string}}
) {
  try {
    if (!String(params.secundarioId)) return new NextResponse("Secondary UUID must be a string", { status: 400 });
    
    const secondary = await db.k72623_lo.findUnique({ where: {deduplicationId: params.secundarioId} });

    if (!secondary) return NextResponse.json("Invalid secondary UUID", { status: 400 });

    return NextResponse.json(secondary);

  } catch (error) {
    console.log("[SECONDARY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  {params}: {params: {secundarioId: string}}
) {
  try {
    const body: unknown = await req.json();
    const newData = secondaryFormSchema.parse(body);

    const existingSecondaryById = await db.k72623_lo.findUnique({ where: { deduplicationId: params.secundarioId } });

    if (!existingSecondaryById) 
      return NextResponse.json("Secondary does not exist", { status: 400 });

    await db.k72623_lo.update({
      where: { 
        deduplicationId: newData.deduplicationId
      },
      data: {
        ...newData
      }
    });

    return NextResponse.json("Secondary updated successfully", { status: 201 });

  } catch (error) {
    console.log("[SECONDARY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  {params}: {params: {secundarioId: string}}
) {
  try {
    if (!String(params.secundarioId)) return new NextResponse("Secondary UUID must be a string", { status: 400 });
    
    const secondary = await db.k72623_lo.findUnique({ where: {deduplicationId: params.secundarioId} });

    if (!secondary) return NextResponse.json("Invalid secondary UUID", { status: 400 });

    const deletedSecondary = await db.k72623_lo.delete({ where: {deduplicationId: params.secundarioId} });

    return NextResponse.json(deletedSecondary);

  } catch (error) {
    console.log("[SECONDARY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};