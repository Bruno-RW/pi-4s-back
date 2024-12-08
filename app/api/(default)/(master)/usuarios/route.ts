import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET() {
  try {
    const users = await db.user.findMany();

    return NextResponse.json(users);

  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};