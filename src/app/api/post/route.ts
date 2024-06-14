const { PrismaClient } = require("@prisma/client");
import { createResponse } from "@/config/apiResponse";
// import { NextResponse } from "next/server";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/post:
 *   get:
 *     description: Returns Post Detail from URL
 *     responses:
 *       200:
 *         description: Hello World!
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data:  {
 *                        "id": "3",
 *                        "series_no": "8",
 *                        "post_url": "Computer_Science\\Network\\Concept\\03_05.mdx",
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
export async function GET() {
  const url = "http://localhost:3000/blog/study/network/transport-layer/08";
  try {
    return Response.json(
      createResponse("Post found", await findPostByUrl(url)),
    );
  } catch (error) {
    return Response.json({ error: "Post not found" }, { status: 405 });
  }
}

async function findPostByUrl(url: string) {
  // URL을 분해
  const urlParts = url.replace("http://localhost:3000/blog/", "").split("/");
  const [categoryUrl, subjectUrl, seriesUrl, postSeriesNo] = urlParts;

  // Category 찾기
  const category = await prisma.category.findUnique({
    where: {
      url: categoryUrl,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // Subject 찾기
  const subject = await prisma.subject.findUnique({
    where: {
      url: subjectUrl,
      category_id: category.id,
    },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  // Series 찾기
  const series = await prisma.series.findUnique({
    where: {
      url: seriesUrl,
      subject_id: subject.id,
    },
  });

  if (!series) {
    throw new Error("Series not found");
  }

  // Post 찾기
  const post = await prisma.post.findFirst({
    where: {
      series_no: postSeriesNo,
      series_id: series.id,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
}
