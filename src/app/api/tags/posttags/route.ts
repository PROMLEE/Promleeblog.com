export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/tags/posttags:
 *   get:
 *     description: Post tag List
 *     parameters:
 *        - in: query
 *          name: post_id
 *     responses:
 *       200:
 *         description: 성공
 */
export async function GET(req: NextRequest) {
  const post_id = req.nextUrl.searchParams.get("post_id");
  if (!post_id) {
    return NextResponse.json({ error: "post_id is required" }, { status: 405 });
  }
  try {
    return NextResponse.json(
      createResponse("Post Tag List", await postTags(post_id)),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function postTags(post_id: string) {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const post_tags = await prisma.post_Tag.findMany({
    where: {
      post_id: Number(post_id),
    },
  });
  const result = tags.map((tag) => {
    const isExist = post_tags.find((post_tag) => post_tag.tag_id === tag.id);
    return {
      ...tag,
      isExist: !!isExist,
    };
  });
  return result;
}

