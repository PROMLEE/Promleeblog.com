const NAVER = "https://searchadvisor.naver.com/indexnow";
const BING = "https://www.bing.com/indexnow";
const KEY = "eb4a5adcc0b340c39ccab6ffb1ecb8b0";

export async function sendUrlsToIndexNow(
  urls: string[],
  IndexHost: "NAVER" | "BING",
) {
  const HOST = IndexHost === "BING" ? BING : NAVER;
  await fetch(HOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
      cache: "no-store",
    },
    body: JSON.stringify({
      host: "www.promleeblog.com",
      key: KEY,
      urlList: urls,
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        console.error("IndexNow API error:", res.status, res.statusText);
      } else {
        console.log("IndexNow API success:", res.status, res.statusText);
      }
    })
    .catch((error) => {
      console.error("IndexNow API fetch error:", error);
    });
}

export async function sendUrlToIndexNow(
  url: string,
  IndexHost: "NAVER" | "BING",
) {
  const HOST = IndexHost === "BING" ? BING : NAVER;
  await fetch(`${HOST}/indexnow?url=${url}&key=${KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cache: "no-store",
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.error("IndexNow API error:", res.status, res.statusText);
      } else {
        console.log("IndexNow API success:", res.status, res.statusText);
      }
    })
    .catch((error) => {
      console.error("IndexNow API fetch error:", error);
    });
}
