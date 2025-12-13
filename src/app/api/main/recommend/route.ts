export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function GET(req: NextRequest) {
  const take = req.nextUrl.searchParams.get("take");
  if (!take)
    return NextResponse.json({ error: "take none Error" }, { status: 404 });
  try {
    return NextResponse.json(
      createResponse("Post found", await getRecommendPosts(Number(take))),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function getRecommendPosts(take: number) {
  const post = await prisma.post.findMany({
    take,
    orderBy: {
      init_date: "desc",
    },
    where: {
      recommendation: true,
    },
    select: {
      id: true,
      url: true,
      name: true,
      nameko: true,
    },
  });
  return post;
}
