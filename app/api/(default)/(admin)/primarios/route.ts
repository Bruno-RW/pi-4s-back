import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const general = await db.nit2xli.findMany({
      where: {
        time: {
          gte: sixMonthsAgo
        }
      },
      orderBy: {
        time: 'desc'
      }
    });

    const serializedData = general.map((item) => {
      return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key,
          typeof value === 'bigint' ? value.toString() : value,
        ])
      );
    });

    return NextResponse.json(serializedData);

  } catch (error) {
    console.log("[GENERAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};