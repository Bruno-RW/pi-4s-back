import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = getServerSession(authOptions);

    return NextResponse.json({ authenticated: !!session });
  
  } catch (error) {
    console.log("[SESSION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}