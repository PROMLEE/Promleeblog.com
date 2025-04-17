export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
