export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { google } from "googleapis";

const NAVER = "https://searchadvisor.naver.com/indexnow";
const BING = "https://www.bing.com/indexnow";
const KEY = "eb4a5adcc0b340c39ccab6ffb1ecb8b0";

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const id = req.nextUrl.searchParams.get("post_id");
  try {
    const req = await prisma.post.update({
      where: { id: Number(id) },
      data: body,
    });

    revalidatePath(`/blog/post/${req.id}-${req.url}`);

    const revalidationUrl = process.env.REVALIDATION_URL;
    if (revalidationUrl) {
      try {
        const token = process.env.REVALIDATION_TOKEN;
        if (!token) throw new Error("REVALIDATION_TOKEN is not configured");
        const response = await fetch(revalidationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post_id: req.id.toString() }),
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
          redirect: "error",
        });
        if (!response.ok) {
          throw new Error(`Revalidation returned ${response.status}`);
        }
      } catch (error) {
        console.error("Remote post revalidation failed", error);
        return NextResponse.json(
          {
            error:
              "글은 저장됐지만 운영 서버 캐시 갱신에 실패했습니다. 환경변수와 운영 서버 상태를 확인해주세요.",
            saved: true,
          },
          { status: 502 },
        );
      }
    }

    const query = `?url=https://www.promleeblog.com/blog/post/${req.id}-${req.url}&key=${KEY}`;
    console.log({ query });

    await fetch(`${NAVER}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }).then((res) => {
      console.log("NAVER : " + res.status);
      // return res.json();
    });

    await fetch(`${BING}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }).then((res) => {
      console.log("BING : " + res.status);
      // return res.json();
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
    const data = await response.json();
    console.log("Google success : " + data.urlNotificationMetadata.url);
    return NextResponse.json(createResponse("Post update complete"));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 405 });
  }
}
