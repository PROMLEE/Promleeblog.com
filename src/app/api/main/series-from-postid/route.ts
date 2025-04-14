export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function GET(req: NextRequest) {
  const postid = req.nextUrl.searchParams.get("postid");
  if (!postid)
    return NextResponse.json({ error: "Series name Error" }, { status: 404 });
  try {
    return NextResponse.json(
      createResponse("Series List found", await getSeriesList(postid)),
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || "Series List not Found" },
      { status: 405 },
    );
  }
}

async function getSeriesList(postid: string) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postid),
    },
    select: {
      series_id: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }
  const series = await prisma.series.findFirst({
    where: {
      id: post.series_id,
    },
    select: {
      nameko: true,
      Post: {
        orderBy: {
          series_no: "asc",
        },
        select: {
          id: true,
          url: true,
          name: true,
          nameko: true,
        },
      },
    },
  });

  if (!series) {
    throw new Error("Series List error");
  }

  return series;
}
