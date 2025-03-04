export const dynamic = "force-dynamic";
const { PrismaClient } = require("@prisma/client");
import { createResponse } from "@/config/apiResponse";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * @swagger
 * /api/edit/gettags:
 *   get:
 *     description: Returns tag list
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
export async function GET() {
  try {
    return NextResponse.json(createResponse("Tag List found", await getTags()));
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function getTags() {
  const tags = await prisma.tag
    .findMany({
      select: {
        id: true,
        name: true,
        nameko: true,
        is_primary: true,
      },
    })
    .catch((error: any) => {
      console.error(error);
    });
  return tags as EditResponse.GetTags[];
}
