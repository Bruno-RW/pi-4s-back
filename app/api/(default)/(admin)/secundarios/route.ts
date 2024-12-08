import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const secondary = await db.k72623_lo.findMany({
      where: {
        time: {
          gte: sixMonthsAgo
        }
      },
      orderBy: {
        time: 'desc'
      }
    });

    return NextResponse.json(secondary);

  } catch (error) {
    console.log("[SECONDARY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};