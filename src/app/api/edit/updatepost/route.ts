export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const NAVER = "https://searchadvisor.naver.com/indexnow";
const BING = "https://www.bing.com/indexnow";
const KEY = "eb4a5adcc0b340c39ccab6ffb1ecb8b0";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const id = req.nextUrl.searchParams.get("post_id");
  try {
    const req = await prisma.post.update({
      where: { id: Number(id) },
      data: body,
    });

    const query = `?url=https://www.promleeblog.com/blog/post/${req.id}-${req.url}&key=${KEY}`;
    console.log({ query });
    await fetch(`${NAVER}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }).then((res) => {
      console.log(res);
    });

    await fetch(`${BING}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }).then((res) => {
      console.log(res);
    });
    return NextResponse.json(createResponse("Post update complete"));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
