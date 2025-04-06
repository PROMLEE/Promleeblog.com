import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const NAVER = "https://searchadvisor.naver.com/indexnow";
const BING = "https://www.bing.com/indexnow";
const KEY = "eb4a5adcc0b340c39ccab6ffb1ecb8b0";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as IndexNowRequest.SubmitUrlList;
  const HOST = body.indexHost === "BING" ? BING : NAVER;

  await fetch(HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cache: "no-store",
    },
    body: JSON.stringify({
      host: "www.promleeblog.com",
      key: KEY,
      urlList: body.urlList,
    }),
  });

  return NextResponse.json(createResponse("url list send complete"));
}
