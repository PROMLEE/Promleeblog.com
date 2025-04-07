// pages/api/analytics/views.ts
import { NextResponse } from "next/server";
import { totalViews, todayViews } from "@/lib/gaData";

export async function GET() {
  try {
    const [total, today] = await Promise.all([totalViews(), todayViews()]);
    return NextResponse.json({ total, today });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 },
    );
  }
}
