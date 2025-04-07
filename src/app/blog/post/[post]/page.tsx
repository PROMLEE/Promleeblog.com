import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { Metadata } from "next";
import { GenerateMeta } from "@/lib/PostUtils/GenerateMeta";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { Loading } from "@/components/Loading";
import Giscus from "@/components/posts/Giscus";
import { PostService } from "@/config/apis";
import { LocalizedDate } from "@/components/LocalizeDate";
import ViewIncrement from "@/components/mdx/viewIncrement";

export const revalidate = 172800; // 2 days
export const dynamicParams = true;

export async function generateStaticParams() {
  const Links = await PostService().getLinks();
  const posts: string[] = [];
  Links.map((category) => {
    category.Subject.map((sub) => {
      sub.Series.map((series) => {
        series.Post.map((post) => {
          posts.push(post.id + "-" + post.url);
        });
      });
    });
  });
  return posts.map((post) => ({
    post: post,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ post: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const markdownsource = await PostService().getPostMeta({
    post_id: params.post,
  });
  return GenerateMeta({ meta: markdownsource, param: params.post });
}

const Post = async ({ params }: { params: Promise<{ post: string }> }) => {
  const { post } = await params;

  const markdownsource = await PostService().getPost({
    post_id: post.split("-")[0],
  });

  return (
    <>
      <ViewIncrement postId={post.split("-")[0]} />
      <Toup />
      <Suspense fallback={<Loading />}>
        <BreadCrumb params={markdownsource} />
        <MdxHeader
          props={{
            nameko: markdownsource.nameko,
            name: markdownsource.name,
            thumbnail_url: markdownsource.thumbnail_url,
          }}
        />
        <div className="ml-auto text-right">
          📅 <LocalizedDate isoString={markdownsource.init_date} />
        </div>
        <div className="prose dark:prose-invert mt-10 min-h-[100vh] scroll-smooth focus:scroll-auto">
          <MdxBody content={markdownsource.posting} />
          <RightSidebarComp content={markdownsource.posting} />
        </div>
        <Giscus />
      </Suspense>
      <Todown />
    </>
  );
};

export default Post;
