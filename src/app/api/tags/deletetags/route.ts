export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    return NextResponse.json(
      createResponse("delete Tag", await deleteTags(body)),
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}

async function deleteTags(body: TagsRequest.AddTags) {
  const tags = await prisma.post_Tag.deleteMany({
    where: {
      post_id: body.post_id,
      tag_id: body.tag_id,
    },
  });
  return tags;
}
