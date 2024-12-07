import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const secondary = await db.k72623_lo.findMany();

    return NextResponse.json(secondary);

  } catch (error) {
    console.log("[SECONDARY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};