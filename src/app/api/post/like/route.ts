export const dynamic = "force-dynamic";
const { PrismaClient } = require("@prisma/client");
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/post/like:
 *   patch:
 *     description: Patch Post Like
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
 *         description: Patch Post Like
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: null
 *               message: "Post Like + 1"
 *       405:
 *         description: Post not found
 */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  try {
    await prisma.post.update({
      where: { id: body.post_id },
      data: { like: { increment: 1 } },
    });
    return NextResponse.json(createResponse("Post Like + 1"));
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
