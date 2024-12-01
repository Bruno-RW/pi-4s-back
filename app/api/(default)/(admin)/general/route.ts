import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const general = await db.nit2xli.findMany();

    return NextResponse.json(general);

  } catch (error) {
    console.log("[GENERAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};