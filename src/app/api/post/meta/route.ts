export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("post_id")?.split("-")[0];
  const rest = req.nextUrl.searchParams
    .get("post_id")
    ?.split("-")
    .slice(1)
    .join("-");
  if (!id || !rest) {
    return NextResponse.json(
      { error: `Post id Error id: ${id} rest: ${rest}` },
      { status: 404 },
    );
  }
  try {
    const post = await findPostById(id);
    if (post.url !== rest) {
      return NextResponse.json({ error: "url error" }, { status: 405 });
    }
    return NextResponse.json(createResponse("Post found", post));
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function findPostById(id: string) {
  const post = await prisma.post.findFirst({
    where: {
      id: BigInt(id),
    },
    select: {
      nameko: true,
      name: true,
      desc: true,
      url: true,
      metatag: true,
      thumbnail_url: true,
      init_date: true,
      mod_date: true,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}
