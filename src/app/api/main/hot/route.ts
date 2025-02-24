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
 * /api/main/hot:
 *   get:
 *     description: Returns hot posts
 *     parameters:
 *        - in: query
 *          name: take
 *     responses:
 *       200:
 *         description: Returns hot posts
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                       {
 *                          "id": "1",
 *                          "title": "Network Intro",
 *                          "url": "intro",
 *                          "init_date": "2021-09-01T00:00:00.000Z",
 *                          "name": "Network Intro",
 *                          "nameko": "네트워크 도입부",
 *                        }
 *                      ]
 *               message: "Hot Post List found"
 *       405:
 *         description: Post not found
 */
export async function GET(req: NextRequest) {
  const take = req.nextUrl.searchParams.get("take");
  if (!take)
    return NextResponse.json({ error: "take none Error" }, { status: 404 });
  try {
    return NextResponse.json(
      createResponse("Hot Post List found", await getHotPosts(Number(take))),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function getHotPosts(take: number) {
  const post = await prisma.post.findMany({
    take,
    orderBy: {
      view: "desc",
    },
    select: {
      id: true,
      url: true,
      init_date: true,
      name: true,
      nameko: true,
      Series: {
        select: {
          url: true,
          nameko: true,
          Subject: {
            select: {
              url: true,
              nameko: true,
              Category: {
                select: {
                  url: true,
                  nameko: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return post;
}
