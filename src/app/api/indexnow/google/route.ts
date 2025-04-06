export const dynamic = "force-dynamic";
import { createResponse } from "@/config/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  try {
    const searchUrl = req.nextUrl.searchParams.get("url");

    if (!searchUrl) {
      return NextResponse.json(
        createResponse("URL parameter is required", false),
        { status: 400 },
      );
    }

    const encodedUrl = encodeURIComponent(searchUrl);
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
      `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodedUrl}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(tokens as unknown as { access_token: string }).access_token}`,
        },
      },
    );

    const data = await response.json();
    console.log(data);
    return NextResponse.json(createResponse(data));
  } catch (error) {
    console.error("Google Indexing API Error:", error);
    return NextResponse.json(createResponse("Internal Server Error", false), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const searchUrl = body.url;
    const urlList = body.urlList;
    let searchUrls: string[] = [];

    if (searchUrl) {
      searchUrls = [searchUrl];
    } else if (urlList) {
      searchUrls = urlList;
    }
    if (!searchUrl && !urlList) {
      return NextResponse.json(
        createResponse("URL parameter is required", false),
        { status: 400 },
      );
    }

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
    const responseList = [];
    for (const url of searchUrls) {
      const response = await fetch(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(tokens as unknown as { access_token: string }).access_token}`,
          },
          body: JSON.stringify({
            url: url,
            type: "URL_UPDATED",
          }),
        },
      );
      const data = await response.json();
      responseList.push(data.urlNotificationMetadata.url);
    }

    const data = await Promise.all(responseList);
    console.log(data);
    return NextResponse.json(createResponse("success"));
  } catch (error) {
    console.error("Google Indexing API Error:", error);
    return NextResponse.json(createResponse("Internal Server Error", false), {
      status: 500,
    });
  }
}
