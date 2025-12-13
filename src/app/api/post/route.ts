export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextResponse, NextRequest } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("post_id")?.split("-")[0];
  // const rest = req.nextUrl.searchParams
  //   .get("post_id")
  //   ?.split("-")
  //   .slice(1)
  //   .join("-");
  // if (!id || !rest) {
  //   return NextResponse.json(
  //     { error: `Post ID: ${id} not found, rest: ${rest}` },
  //     { status: 404 },
  //   );
  // }
  try {
    const post = await findPostById(id ?? "0");
    if (!post) {
      return NextResponse.json({ error: `Post not found` }, { status: 404 });
    }
    // if (post.url !== rest) {
    //   return NextResponse.json(
    //     { error: `URL mismatch: expected ${rest}, got ${post.url}` },
    //     { status: 405 },
    //   );
    // }
    return NextResponse.json(createResponse("Post found", post));
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
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
