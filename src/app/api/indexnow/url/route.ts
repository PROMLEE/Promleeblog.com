export const dynamic = "force-dynamic";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const NAVER = "https://searchadvisor.naver.com/indexnow";
const BING = "https://www.bing.com/indexnow";
const KEY = "eb4a5adcc0b340c39ccab6ffb1ecb8b0";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  const indexHost = req.nextUrl.searchParams.get("indexHost");

  const HOST = indexHost === "BING" ? BING : NAVER;

  await fetch(`${HOST}?url=${url}&key=${KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "no-store",
    },
  });

  return NextResponse.json(createResponse("url send complete"));
}
