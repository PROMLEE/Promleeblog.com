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
 * /api/edit/addsubject:
 *    post:
 *      description: Add Subject
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                category_id:
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
 *                  example: "url in here"
 *                category_no:
 *                  type: number
 *                  example: 999
 *                desc:
 *                  type: string
 *                  example: "desc in here"
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
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await prisma.subject.create({
      data: body,
    });
    return NextResponse.json(createResponse("subject List found"));
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
