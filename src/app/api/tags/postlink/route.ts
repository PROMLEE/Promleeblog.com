export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/tags/postlink:
 *   get:
 *     description: Returns tag links
 *     parameters:
 *        - in: query
 *          name: tag_id
 *     responses:
 *       200:
 *         description: Returns tag links
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               message: "Tag Links found"
 *       405:
 *         description: Tags not found
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("tag_id");
  if (!id) {
    return NextResponse.json({ error: "Tag id Error" }, { status: 404 });
  }
  try {
    return NextResponse.json(
      createResponse("Tag List found", await getTagLinks(parseInt(id))),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function getTagLinks(id: number) {
  return await prisma.post_Tag.findMany({
    where: {
      tag_id: id,
      Post: {
        lock: false,
      },
    },
    orderBy: {
      post_id: "asc",
    },
    select: {
      Post: {
        select: {
          id: true,
          series_no: true,
          url: true,
          name: true,
          nameko: true,
          desc: true,
          init_date: true,
          thumbnail_url: true,
          view: true,
          like: true,
          mod_date: true,
          lock: true,
        },
      },
    },
  });
}
