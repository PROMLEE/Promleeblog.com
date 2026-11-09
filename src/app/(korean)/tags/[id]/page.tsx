import { tagMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { taxonomyName } from "@/lib/i18n/taxonomy";
import Link from "next/link";
import { TagsService } from "@/config/apis/service/tags";
import { Cards } from "@/components/posts/Cards";
import AdComponent from "@/components/ads/adsense";

const getTag = cache(async (slug: string) => {
  const tagId = slug.split("-")[0];
  if (!/^[1-9]\d*$/.test(tagId)) return;
  const tags = await TagsService().getTags({ sort: "id" });
  return tags.find((item) => String(item.id) === tagId);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tag = await getTag(id);
  return tag ? tagMetadata(tag, "ko") : {};
}

const getTags = async (params: { id: string }) => {
  const postList = await TagsService().getPostLink({
    tag_id: parseInt(params.id.split("-")[0]),
  });
  return postList;
};

const Tags = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const tag = await getTag(id);
  if (!tag) notFound();
  const postList = await getTags({ id });

  return (
    <div>
      <h2 className="mt-7 mb-3 text-2xl font-bold">
        # {taxonomyName(tag, "ko")}
      </h2>
      <div className="flex w-full flex-wrap gap-5">
        {postList.map((post, idx) => (
          <Link href={`/blog/post/${post.Post.id}-${post.Post.url}`} key={idx}>
            <Cards post={post.Post} idx={idx} />
          </Link>
        ))}
      </div>
      <AdComponent adSlot="9354906951" adFormat="autorelaxed" />
    </div>
  );
};
export default Tags;
