export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const prisma = new PrismaClient();

const NAVER = "https://searchadvisor.naver.com/indexnow";
const BING = "https://www.bing.com/indexnow";
const KEY = "eb4a5adcc0b340c39ccab6ffb1ecb8b0";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

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
    const query = `?url=https://www.promleeblog.com/blog/post/${req.id}-${req.url}&key=${KEY}`;

    await fetch(`${NAVER}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }).then((res) => {
      console.log(res.json());
    });

    await fetch(`${BING}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }).then((res) => {
      console.log(res.json());
    });

    const key = JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_API_CREDENTIALS!);
    // Promise로 변환하여 비동기 처리
    const getToken = () => {
      return new Promise((resolve, reject) => {
        const jwtClient = new google.auth.JWT(
          key.client_email,
          undefined,
          key.private_key,
          ["https://www.googleapis.com/auth/indexing"],
          undefined,
        );

        jwtClient.authorize((err, tokens) => {
          if (err) reject(err);
          else resolve(tokens);
        });
      });
    };
    const tokens = await getToken();
    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(tokens as unknown as { access_token: string }).access_token}`,
        },
        body: JSON.stringify({
          url: `https://www.promleeblog.com/blog/post/${req.id}-${req.url}`,
          type: "URL_UPDATED",
        }),
      },
    );
    console.log("google index api: " + response.json());
    return NextResponse.json(createResponse("Post insert complete"));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
