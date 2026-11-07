import Home from "@/components/pages/Home";
import ArticleContent from "@/components/pages/ArticleContent";
import { pageMetadata, articleMetadata } from "@/lib/i18n/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostService } from "@/config/apis";
import { getTranslation, getTranslations } from "@/lib/i18n/translations";
import { sourceHash } from "@/lib/i18n/source-hash";
import { TagsService } from "@/config/apis/service/tags";
import { messages, categoryLabel } from "@/lib/i18n/messages";
import {
  englishLabel,
  siteUrl,
  type TranslationLocale,
} from "@/lib/i18n/routing";
import type { Metadata } from "next";

export async function loadArticle(slug: string, locale: TranslationLocale) {
  if (!/^[1-9]\d*-.+/.test(slug)) notFound();
  const id = slug.split("-")[0];
  let post: PostResponse.GetPost["data"];
  try {
    post = await PostService().getPost({ post_id: id });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Post not found"))
      notFound();
    throw error;
  }
  if (post.lock || `${post.id}-${post.url}` !== slug) notFound();
  const translation = await getTranslation(id, locale);
  const meta = post;
  return { post, meta, translation, id };
}

export async function internationalMetadata(
  locale: TranslationLocale,
  path: string[],
): Promise<Metadata> {
  const t = messages[locale];
  if (path[0] === "blog" && path[1] === "post" && path.length === 3) {
    const { meta, translation } = await loadArticle(path[2], locale);
    const original = `/blog/post/${path[2]}`;
    if (!translation)
      return {
        title: t.pending,
        robots: { index: false, follow: true },
        alternates: { canonical: siteUrl + original },
      };
    return articleMetadata(meta, path[2], locale, translation);
  }
  return pageMetadata(locale, "/" + path.join("/"));
}

export default async function InternationalPage({
  locale,
  path,
}: {
  locale: TranslationLocale;
  path: string[];
}) {
  const t = messages[locale];
  if (!path.length) return <Home locale={locale} />;
  if (path[0] === "blog" && path[1] === "post" && path.length === 3) {
    const { post, translation } = await loadArticle(path[2], locale);
    const original = `/blog/post/${path[2]}`;
    if (!translation)
      return (
        <section className="my-20 space-y-6">
          <h1 className="text-2xl font-bold">{t.pending}</h1>
          <p lang="ko">{post.nameko}</p>
          <Link href={original} className="underline">
            {t.original}
          </Link>
        </section>
      );
    return (
      <ArticleContent
        locale={locale}
        originalContent={post.posting}
        markdownsource={{
          ...post,
          nameko: translation.title,
          name: translation.title,
          desc: translation.description,
          posting: translation.content,
        }}
        notice={
          sourceHash(post) !== translation.source_hash ? (
            <p role="status" className="my-4 rounded border p-3 text-sm">
              {t.updated}
            </p>
          ) : undefined
        }
      />
    );
  }
  if (path[0] === "aboutme") {
    if (
      path.length > 2 ||
      (path[1] && !["promleeblog", "map2zero"].includes(path[1]))
    )
      notFound();
    return (
      <section className="my-20 space-y-6">
        <h1 className="text-3xl font-bold">{t.about}</h1>
        <p>{t.intro}</p>
        <Link href={`/${path.join("/")}`} className="underline">
          {t.original}
        </Link>
        <p>
          <a href="https://github.com/PROMLEE">GitHub · PROMLEE</a>
        </p>
      </section>
    );
  }
  if (
    path.length &&
    path[0] !== "blog" &&
    path[0] !== "sitemap-tree" &&
    path[0] !== "tags"
  )
    notFound();
  if (
    path.length > 3 ||
    (path[0] === "sitemap-tree" && path.length > 1) ||
    (path[0] === "tags" && (path.length !== 2 || !/^[1-9]\d*-/.test(path[1])))
  )
    notFound();
  const [categories, translations, taggedPosts] = await Promise.all([
    PostService().getLinks(),
    getTranslations(locale),
    path[0] === "tags"
      ? TagsService().getPostLink({ tag_id: Number(path[1].split("-")[0]) })
      : Promise.resolve(null),
  ]);
  const selected =
    path[0] === "blog" && path[1]
      ? categories.filter((category) => category.url === path[1])
      : categories;
  if (!selected.length && path[1]) notFound();
  if (
    path[2] &&
    !selected.some((category) =>
      category.Subject.some((subject) => subject.url === path[2]),
    )
  )
    notFound();
  const posts = selected.flatMap((category) =>
    category.Subject.filter(
      (subject) => !path[2] || subject.url === path[2],
    ).flatMap((subject) =>
      subject.Series.flatMap((series) =>
        series.Post.filter((post) => !post.lock).map((post) => ({
          ...post,
          category,
          subject,
        })),
      ),
    ),
  );
  // The API may list a post in more than one navigation branch.
  const tagIds = taggedPosts
    ? new Set(taggedPosts.map((item) => String(item.Post.id)))
    : null;
  const uniquePosts = [
    ...new Map(posts.map((post) => [String(post.id), post])).values(),
  ]
    .filter((post) => !tagIds || tagIds.has(String(post.id)))
    .sort((a, b) => Number(b.id) - Number(a.id));
  return (
    <section className="my-14">
      <h1 className="text-3xl font-bold">
        {path.length ? t.posts : "PromleeBlog"}
      </h1>
      <p className="my-4 text-gray-500">{t.intro}</p>
      <nav aria-label={t.categories} className="my-8 flex flex-wrap gap-3">
        <Link
          className="rounded border px-3 py-2 text-sm"
          href={`/${locale}/blog`}
        >
          {t.categories}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.url}
            className="rounded border px-3 py-2 text-sm"
            href={`/${locale}/blog/${category.url}`}
          >
            {categoryLabel(category.url, locale) || englishLabel(category.url)}
          </Link>
        ))}
      </nav>
      {path[1] && (
        <nav className="my-6 flex flex-wrap gap-3">
          {selected.flatMap((category) =>
            category.Subject.map((subject) => (
              <Link
                className="underline"
                key={subject.url}
                href={`/${locale}/blog/${category.url}/${subject.url}`}
              >
                {englishLabel(subject.url)}
              </Link>
            )),
          )}
        </nav>
      )}
      <h2 className="mb-4 text-xl font-semibold">{t.recent}</h2>
      {!uniquePosts.length && <p>{t.empty}</p>}
      <ul className="grid gap-4 sm:grid-cols-2">
        {uniquePosts.map((post) => {
          const translation = translations.get(String(post.id));
          return (
            <li key={post.id} className="rounded-lg border p-5">
              <Link
                className="font-medium hover:underline"
                href={`/${locale}/blog/post/${post.id}-${post.url}`}
              >
                <span lang={translation ? locale : "ko"}>
                  {translation?.title || post.nameko}
                </span>
              </Link>
              <p className="mt-2 text-xs text-gray-500">
                {translation?.description || t.pending}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
