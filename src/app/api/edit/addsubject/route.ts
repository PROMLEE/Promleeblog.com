export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await prisma.subject.create({
      data: body,
    });
    return NextResponse.json(createResponse("subject List found"));
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
