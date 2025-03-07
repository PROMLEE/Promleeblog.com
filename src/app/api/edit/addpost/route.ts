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
 * /api/edit/addpost:
 *    post:
 *      description: Add Post
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
export async function POST(req: NextRequest) {
  const body = (await req.json()) as EditRequest.PostAddPost;
  const tags = body.tags;
  const data = {
    series_id: body.series_id,
    name: body.name,
    nameko: body.nameko,
    url: body.url,
    series_no: body.series_no,
    desc: body.desc,
    thumbnail_url: body.thumbnail_url,
    lock: body.lock,
    posting: body.posting,
    metatag: body.metatag,
  };
  try {
    const req = await prisma.post.create({
      data: data,
    });
    for (let i = 0; i < tags.length; i++) {
      await prisma.post_Tag.create({
        data: {
          post_id: req.id,
          tag_id: tags[i],
        },
      });
    }
    return NextResponse.json(createResponse("Post insert complete"));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
