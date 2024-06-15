export const dynamic = "force-dynamic";
const { PrismaClient } = require("@prisma/client");
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/post/subjectlist:
 *   get:
 *     description: Returns Subject List
 *     parameters:
 *        - in: query
 *          name: categoryurl
 *     responses:
 *       200:
 *         description: Returns Subject List
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                       {
 *                          "id": "1",
 *                          "category_id": "1",
 *                          "name": "Network",
 *                          "nameko": "네트워크",
 *                          "url": "network",
 *                          "subject_no": 1,
 *                      }
 *                   ]
 *               message: "Subject List found"
 *       405:
 *         description: Subject List not found
 */
export async function GET(req: NextRequest) {
  const categoryurl = req.nextUrl.searchParams.get("categoryurl");
  if (!categoryurl)
    return NextResponse.json({ error: "Category name Error" }, { status: 404 });
  try {
    return NextResponse.json(
      createResponse("Subject List found", await getSubjectList(categoryurl)),
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || "Subject List not Found" },
      { status: 405 },
    );
  }
}

async function getSubjectList(categoryurl: string) {
  const category = await prisma.category.findFirst({
    where: {
      url: categoryurl,
    },
    select: {
      id: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const subjectList = await prisma.subject.findMany({
    where: {
      category_id: category.id,
    },
    orderBy: {
      subject_no: "asc",
    },
  });

  if (!subjectList) {
    throw new Error("Subject List error");
  }

  return subjectList;
}
