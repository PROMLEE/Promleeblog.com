// Prisma Client 초기화
const { PrismaClient } = require("@prisma/client");
import { createResponse } from "@/config/apiResponse";
import { NextResponse } from "next/server";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const prisma = new PrismaClient();
export async function GET() {
  const url = "http://localhost:3000/blog/study/network/transport-laye/08";
  try {
    return NextResponse.json(
      createResponse("Post found", await findPostByUrl(url)),
    );
  } catch (error) {
    return NextResponse.json({ error: "Post not found" }, { status: 405 });
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
