export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/tags:
 *   get:
 *     description: Returns tag list
 *     parameters:
 *        - in: query
 *          name: sort
 *     responses:
 *       200:
 *         description: Returns tag list
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                       {
 *                          id: 1,
 *                          name: "tag1",
 *                          nameko: "tag1",
 *                          is_primary: true
 *                        }
 *                      ]
 *               message: "Tag List found"
 *       405:
 *         description: Tags not found
 */
export async function GET(req: NextRequest) {
  const sort = req.nextUrl.searchParams.get("sort");
  try {
    return NextResponse.json(
      createResponse("Tag List found", await getTags(sort || "id")),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function getTags(sort?: string) {
  if (sort === "count") {
    const tagsCount = await prisma.post_Tag.groupBy({
      by: ["tag_id"],
      _count: {
        _all: true,
      },
    });

    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        nameko: true,
        is_primary: true,
      },
    });

    tagsCount.sort((a, b) => b._count._all - a._count._all);

    const result = tagsCount.map((tag) => {
      const isExist = tags.find((t) => t.id === tag.tag_id);
      return {
        name: isExist?.name,
        nameko: isExist?.nameko,
        id: tag.tag_id,
        is_primary: isExist?.is_primary,
        count: tag._count._all,
      };
    });

    return result;
  } else {
    return prisma.tag.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }
}
