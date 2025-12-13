export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextResponse } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};
/**
 * @swagger
 * /api/post/categorylist:
 *   get:
 *     description: Returns Category List
 *     responses:
 *       200:
 *         description: Returns Category List
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                       {
 *                          "id": "1",
 *                          "name": "Study",
 *                          "nameko": "개인공부",
 *                          "ord": 1,
 *                          "url": "study",
 *                      }
 *                   ]
 *               message: "Category List found"
 *       405:
 *         description: Category List not found
 */
export async function GET() {
  try {
    return NextResponse.json(
      createResponse("Category List found", await getCategoryList()),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function getCategoryList() {
  const categoryList = await prisma.category.findMany({
    orderBy: {
      ord: "asc",
    },
  });
  return categoryList;
}
