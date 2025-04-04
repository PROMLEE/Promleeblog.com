const INDEXNOW_API = "https://searchadvisor.naver.com/indexnow";
const KEY = "c5e3ab7f-81d2-4f99-a0f2-a35efb9ca23a";

export async function sendUrlsToIndexNow(urls: string[]) {
  await fetch(INDEXNOW_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export async function sendUrlToIndexNow(url: string) {
  await fetch(`${INDEXNOW_API}/indexnow?url=${url}&key=${KEY}`, {
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
