export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/tags/addtags:
 *   post:
 *     description: Add tag
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                post_id:
 *                  type: number
 *                  example: 999
 *                tag_id:
 *                  type: number
 *                  example: 999
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    return NextResponse.json(createResponse("Add Tag", await addTags(body)));
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function addTags(body: TagsRequest.AddTags) {
  const tags = await prisma.post_Tag.create({
    data: {
      post_id: body.post_id,
      tag_id: body.tag_id,
    },
  });
  return tags;
}
