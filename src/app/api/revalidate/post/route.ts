import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = process.env.REVALIDATION_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  const expected = Buffer.from(`Bearer ${token}`);
  const received = Buffer.from(req.headers.get("authorization") ?? "");
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof body?.post_id !== "string" || !/^[1-9]\d*$/.test(body.post_id)) {
    return NextResponse.json({ error: "Invalid post_id" }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: BigInt(body.post_id) },
      select: { id: true, url: true },
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const path = `/blog/post/${post.id}-${post.url}`;
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    console.error("Post revalidation failed", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
