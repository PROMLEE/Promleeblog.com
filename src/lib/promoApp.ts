export type PromoAppId = "portrhythm" | "promecapt" | "promeftp";

// ProjectsShowcase.tsx의 projects 배열 순서와 같아야 한다(id 순환 분배와 "다른 앱" 순서에 쓴다).
export const PROMO_APP_ORDER = [
  "portrhythm",
  "promecapt",
  "promeftp",
] as const satisfies readonly PromoAppId[];

export const PROMECAPT_INTRO_POST_ID = 474;
export const PROMEFTP_INTRO_POST_ID = 475;

export type PromoPostInput = {
  // 런타임 API 응답은 id를 문자열로 주므로(예: "474") 숫자와 문자열을 모두 받는다.
  id: number | string;
  Series: { Subject: { url: string; Category: { url: string } } };
};

export function pickPromoApp(post: PromoPostInput): PromoAppId {
  if (String(post.id).trim() === "") return "promecapt";
  const id = Number(post.id);
  if (!Number.isInteger(id) || id < 0) return "promecapt";

  // 소개 글에서는 자기 앱을 띄우지 않는다. 주제 규칙보다 먼저 본다.
  if (id === PROMECAPT_INTRO_POST_ID) return "promeftp";
  if (id === PROMEFTP_INTRO_POST_ID) return "promecapt";

  const subject = post.Series.Subject.url;
  if (subject === "investment") return "portrhythm";
  if (subject === "macos") return "promecapt";

  return PROMO_APP_ORDER[id % PROMO_APP_ORDER.length];
}

export function otherPromoApps(main: PromoAppId): [PromoAppId, PromoAppId] {
  const others = PROMO_APP_ORDER.filter((app) => app !== main);
  return [others[0], others[1]];
}
