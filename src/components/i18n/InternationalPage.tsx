import Home from "@/components/pages/Home";
import ArticleContent from "@/components/pages/ArticleContent";
import { pageMetadata, articleMetadata, languageCode } from "@/lib/i18n/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostService } from "@/config/apis";
import { getTranslation, getTranslations } from "@/lib/i18n/translations";
import { sourceHash } from "@/lib/i18n/source-hash";
import { TagsService } from "@/config/apis/service/tags";
import { messages } from "@/lib/i18n/messages";
import {
  localizePath,
  locales,
  siteUrl,
  type TranslationLocale,
} from "@/lib/i18n/routing";
import { tagPath, taxonomyDescription, taxonomyName } from "@/lib/i18n/taxonomy";
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
  if (path[0] === "blog" && path[1]) {
    const categories = await PostService().getLinks();
    const category = categories.find((item) => item.url === path[1]);
    const subject = path[2]
      ? category?.Subject.find((item) => item.url === path[2])
      : undefined;
    const selected = subject || category;
    if (selected) {
      const title = taxonomyName(selected, locale);
      return pageMetadata(locale, "/" + path.join("/"), {
        title,
        description: taxonomyDescription(title, locale),
      });
    }
  }
  if (path[0] === "tags" && path[1]) {
    const tagId = path[1].split("-")[0];
    const tags = await TagsService().getTags({ sort: "count" });
    const tag = tags.find((item) => String(item.id) === tagId);
    if (tag) {
      const title = taxonomyName(tag, locale);
      const canonicalPath = tagPath(tag.id, title);
      const languages = Object.fromEntries([
        ...locales.map((language) => [
          languageCode(language),
          siteUrl +
            localizePath(
              tagPath(tag.id, taxonomyName(tag, language)),
              language,
            ),
        ]),
        [
          "x-default",
          siteUrl + localizePath(tagPath(tag.id, taxonomyName(tag, "ko")), "ko"),
        ],
      ]);
      return pageMetadata(locale, canonicalPath, {
        title,
        description: taxonomyDescription(title, locale),
        languages,
      });
    }
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
  const [categories, translations, taggedPosts, tags] = await Promise.all([
    PostService().getLinks(),
    getTranslations(locale),
    path[0] === "tags"
      ? TagsService().getPostLink({ tag_id: Number(path[1].split("-")[0]) })
      : Promise.resolve(null),
    path[0] === "tags"
      ? TagsService().getTags({ sort: "count" })
      : Promise.resolve([]),
  ]);
  const currentTag =
    path[0] === "tags"
      ? tags.find((tag) => String(tag.id) === path[1].split("-")[0])
      : undefined;
  if (path[0] === "tags" && !currentTag) notFound();
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
  const selectedCategory = selected[0];
  const selectedSubject = path[2]
    ? selectedCategory?.Subject.find((subject) => subject.url === path[2])
    : undefined;
  const pageTitle = currentTag
    ? taxonomyName(currentTag, locale)
    : selectedSubject
      ? taxonomyName(selectedSubject, locale)
      : path[0] === "blog" && path[1] && selectedCategory
        ? taxonomyName(selectedCategory, locale)
        : t.posts;
  const pageDescription =
    (currentTag || selectedSubject || (path[0] === "blog" && path[1]))
      ? taxonomyDescription(pageTitle, locale)
      : t.intro;
  const posts = selected.flatMap((category) =>
    category.Subject.filter(
      (subject) => !path[2] || subject.url === path[2],
    ).flatMap((subject) =>
      subject.Series.flatMap((series) =>
        series.Post.filter((post) => !post.lock).map((post) => ({
          ...post,
          category,
          subject,
          Series: series,
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
  const postsBySeries = new Map<string, typeof uniquePosts>();
  for (const post of uniquePosts) {
    const key = String(post.Series.id);
    const group = postsBySeries.get(key) || [];
    group.push(post);
    postsBySeries.set(key, group);
  }
  return (
    <section className="my-14">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
      <p className="my-4 text-gray-500">{pageDescription}</p>
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
            {taxonomyName(category, locale)}
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
                {taxonomyName(subject, locale)}
              </Link>
            )),
          )}
        </nav>
      )}
      <h2 className="mb-4 text-xl font-semibold">{t.recent}</h2>
      {!uniquePosts.length && <p>{t.empty}</p>}
      {Array.from(postsBySeries.entries()).map(([seriesId, seriesPosts]) => (
        <section key={seriesId} className="mt-8">
          <h2
            id={`series-${seriesId}`}
            className="mb-3 text-lg font-semibold"
          >
            {taxonomyName(seriesPosts[0].Series, locale)}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {seriesPosts.map((post) => {
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
      ))}
    </section>
  );
}
