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
 * /api/post/view:
 *   patch:
 *     description: Patch Post View
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                post_id:
 *                  type: number
 *                  example: 1
 *     responses:
 *       200:
 *         description: Patch Post ViewCount + 1
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: null
 *               message: "Post ViewCount + 1"
 *       405:
 *         description: Post not found
 */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  try {
    await prisma.post.update({
      where: { id: body.post_id },
      data: { view: { increment: 1 } },
    });
    return NextResponse.json(createResponse("Post ViewCount + 1"));
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
