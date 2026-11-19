import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PROMO_APP_ORDER,
  otherPromoApps,
  pickPromoApp,
  type PromoAppId,
} from "../src/lib/promoApp";

const post = (id: number | string, category: string, subject: string) => ({
  id,
  Series: { Subject: { url: subject, Category: { url: category } } },
});

test("investment posts are always PortRhythm", () => {
  assert.equal(pickPromoApp(post(435, "etc", "investment")), "portrhythm");
  assert.equal(pickPromoApp(post(442, "etc", "investment")), "portrhythm");
});

test("macOS posts are always Promecapt", () => {
  assert.equal(pickPromoApp(post(476, "etc", "macos")), "promecapt");
  assert.equal(pickPromoApp(post(119, "etc", "macos")), "promecapt");
  assert.equal(pickPromoApp(post(302, "study", "macos")), "promecapt");
});

test("intro posts never show their own app", () => {
  assert.equal(pickPromoApp(post(474, "etc", "macos")), "promeftp");
  assert.equal(pickPromoApp(post(475, "etc", "macos")), "promecapt");
  assert.equal(pickPromoApp(post(475, "programming", "x")), "promecapt");
});

test("intro post rule wins over the investment subject rule", () => {
  assert.equal(pickPromoApp(post(474, "etc", "investment")), "promeftp");
});

test("subject rules win over id rotation", () => {
  assert.equal(
    pickPromoApp(post(300, "programming", "investment")),
    "portrhythm",
  );
});

test("other posts rotate by id modulo 3", () => {
  assert.equal(
    pickPromoApp(post(300, "programming", "react-nextjs")),
    "portrhythm",
  );
  assert.equal(
    pickPromoApp(post(301, "programming", "react-nextjs")),
    "promecapt",
  );
  assert.equal(pickPromoApp(post(302, "study", "network")), "promeftp");
});

test("unknown subjects also rotate by id modulo 3", () => {
  assert.equal(pickPromoApp(post(303, "etc", "daily-life")), "portrhythm");
  assert.equal(pickPromoApp(post(304, "unknown", "unknown")), "promecapt");
});

test("subject matching is exact, not case-insensitive", () => {
  assert.equal(pickPromoApp(post(302, "etc", "Investment")), "promeftp");
});

test("string ids from the API are matched like numbers", () => {
  assert.equal(pickPromoApp(post("474", "etc", "macos")), "promeftp");
  assert.equal(pickPromoApp(post("475", "etc", "macos")), "promecapt");
  assert.equal(pickPromoApp(post("302", "study", "network")), "promeftp");
  assert.equal(
    pickPromoApp(post("302", "study", "network")),
    pickPromoApp(post(302, "study", "network")),
  );
});

test("id 0 is a valid id and rotates to PortRhythm", () => {
  assert.equal(pickPromoApp(post(0, "study", "x")), "portrhythm");
});

test("invalid ids fall back to Promecapt", () => {
  assert.equal(pickPromoApp(post("abc", "study", "x")), "promecapt");
  assert.equal(pickPromoApp(post(-1, "study", "x")), "promecapt");
  assert.equal(pickPromoApp(post(1.5, "study", "x")), "promecapt");
  assert.equal(pickPromoApp(post("", "study", "x")), "promecapt");
});

test("the same input always gives the same app", () => {
  assert.equal(
    pickPromoApp(post(301, "study", "x")),
    pickPromoApp(post(301, "study", "x")),
  );
});

test("ids 1 to 300 split evenly across the three apps", () => {
  const counts = new Map<PromoAppId, number>();
  for (let id = 1; id <= 300; id++) {
    const app = pickPromoApp(post(id, "study", "x"));
    counts.set(app, (counts.get(app) ?? 0) + 1);
  }
  for (const app of PROMO_APP_ORDER) {
    assert.equal(counts.get(app), 100);
  }
});

test("PROMO_APP_ORDER lists all three apps once", () => {
  assert.deepEqual([...PROMO_APP_ORDER].sort(), [
    "portrhythm",
    "promecapt",
    "promeftp",
  ]);
});

test("otherPromoApps returns the two apps that are not the main one", () => {
  assert.deepEqual(otherPromoApps("portrhythm"), ["promecapt", "promeftp"]);
  assert.deepEqual(otherPromoApps("promecapt"), ["portrhythm", "promeftp"]);
  assert.deepEqual(otherPromoApps("promeftp"), ["portrhythm", "promecapt"]);
});

test("otherPromoApps keeps PROMO_APP_ORDER order and never includes main", () => {
  for (const main of PROMO_APP_ORDER) {
    const others = otherPromoApps(main);
    assert.equal(others.length, 2);
    assert.ok(!others.includes(main));
    assert.deepEqual(
      others,
      PROMO_APP_ORDER.filter((app) => app !== main),
    );
  }
});
