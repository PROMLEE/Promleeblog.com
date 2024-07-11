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
 * /api/post/links:
 *   get:
 *     description: Returns Links
 *     responses:
 *       200:
 *         description: Returns Links
 *         content:
 *           /:
 *             example:
 *               status: 200
 *               success: true
 *               data: [
 *                       {
 *                          "nameko": "개인학습",
 *                          "url": "study",
 *                          "Subject": [
 *                                {
 *                                "nameko": "네트워크",
 *                                "url": "network"
 *                                }
 *                            ]
 *                        }
 *                   ]
 *               message: "Links found"
 *       405:
 *         description: Links not found
 */
export async function GET() {
  try {
    return NextResponse.json(createResponse("Links found", await getLinks()));
  } catch (error) {
    return NextResponse.json(
      { error: error || "Links not Found" },
      { status: 405 },
    );
  }
}

async function getLinks() {
  const Links = await prisma.category.findMany({
    orderBy: {
      ord: "asc",
    },
    select: {
      nameko: true,
      url: true,
      Subject: {
        orderBy: {
          category_no: "asc",
        },
        select: {
          nameko: true,
          url: true,
          Series: {
            orderBy: {
              subject_no: "asc",
            },
            select: {
              nameko: true,
              url: true,
              id: true,
              Post: {
                orderBy: {
                  series_no: "asc",
                },
                select: {
                  id: true,
                  url: true,
                  lock: true,
                  nameko: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return Links;
}
