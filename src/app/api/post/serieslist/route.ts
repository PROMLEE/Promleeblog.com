export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/post/serieslist:
 *   get:
 *     description: Returns Series List
 *     parameters:
 *        - in: query
 *          name: subjecturl
 *     responses:
 *       200:
 *         description: Returns Series List
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                       {
 *                          "id": "1",
 *                          "subject_id": "1",
 *                          "name": "Network Intro",
 *                          "nameko": "네트워크 도입부",
 *                          "url": "intro",
 *                          "series_no": 1,
 *                          "caption": "",
 *                      }
 *                   ]
 *               message: "Series List found"
 *       405:
 *         description: Series List not found
 */
export async function GET(req: NextRequest) {
  const subjecturl = req.nextUrl.searchParams.get("subjecturl");
  if (!subjecturl)
    return NextResponse.json({ error: "Series name Error" }, { status: 404 });
  try {
    return NextResponse.json(
      createResponse("Series List found", await getSeriesList(subjecturl)),
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || "Series List not Found" },
      { status: 405 },
    );
  }
}

async function getSeriesList(subjecturl: string) {
  const subject = await prisma.subject.findFirst({
    where: {
      url: subjecturl,
    },
    select: {
      id: true,
      nameko: true,
    },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  const seriesList = {
    nameko: subject.nameko,
    Series: await prisma.series.findMany({
      where: {
        subject_id: subject.id,
      },
      orderBy: {
        subject_no: "asc",
      },
      include: {
        Post: {
          orderBy: {
            series_no: "asc",
          },
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
    }),
  };

  if (!seriesList) {
    throw new Error("Series List error");
  }

  return seriesList;
}
