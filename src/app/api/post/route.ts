export const dynamic = "force-dynamic";
const { PrismaClient } = require("@prisma/client");
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const prisma = new PrismaClient();
/**
 * @swagger
 * /api/post:
 *   get:
 *     description: Returns Post Detail from URL
 *     parameters:
 *        - in: query
 *          name: id
 *     responses:
 *       200:
 *         description: Returns Post Detail from URL
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data:  {
 *                        "id": "3",
 *                        "series_no": "8",
 *                        "name": "Connection-Oriented Transport: TCP",
 *                        "nameko": "연결 지향 통신: TCP",
 *                        "desc": "연결 지향 통신에 대한 설명",
 *                        "init_date": "2024-06-14T07:14:57.104Z",
 *                        "thumbnail_url": "",
 *                        "view": 0,
 *                        "like": 0,
 *                        "series_id": "2",
 *                        "mod_date": "2024-06-14T07:14:57.104Z",
 *                        "lock": true,
 *                        "posting": "hihihi"
 *                     }
 *               message: "Post found"
 *       405:
 *         description: Post not found
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")?.split("-")[0];
  const rest = req.nextUrl.searchParams
    .get("id")
    ?.split("-")
    .slice(1)
    .join("-");
  if (!id || !rest) {
    return NextResponse.json({ error: "Post id Error" }, { status: 404 });
  }
  try {
    const post = await findPostById(id);
    if (post.url !== rest) {
      return NextResponse.json({ error: "url error" }, { status: 405 });
    }
    return NextResponse.json(createResponse("Post found", post));
  } catch (error) {
    return NextResponse.json({ error: "Post not found" }, { status: 405 });
  }
}

async function findPostById(id: string) {
  const post = await prisma.post.findFirst({
    where: {
      id: BigInt(id),
    },
    include: {
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

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}
