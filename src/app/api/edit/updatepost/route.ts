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
 * /api/edit/update:
 *    patch:
 *      description: Update Post
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                series_id:
 *                  type: number
 *                  example: 999
 *                name:
 *                  type: string
 *                  example: "name"
 *                nameko:
 *                  type: string
 *                  example: "nameko"
 *                url:
 *                  type: string
 *                  example: "url-in-here"
 *                series_no:
 *                  type: number
 *                  example: 999
 *                desc:
 *                  type: string
 *                  example: "description in here"
 *                thumbnail_url:
 *                  type: string
 *                  example: "thumbnail url in here"
 *                lock:
 *                  type: boolean
 *                  example: false
 *                posting:
 *                  type: string
 *                  example: "posting in here"
 *      responses:
 *        200:
 *          description: 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: int
 *                    example: 200
 */
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const id = req.nextUrl.searchParams.get("post_id");
  try {
    await prisma.post.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json(createResponse("Post update complete"));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
