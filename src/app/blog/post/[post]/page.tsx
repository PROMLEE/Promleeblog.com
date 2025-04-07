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

// // Next.js will invalidate the cache when a
// // request comes in, at most once every 60 seconds.
// export const revalidate = 60;

// // We'll prerender only the params from `generateStaticParams` at build time.
// // If a request comes in for a path that hasn't been generated,
// // Next.js will server-render the page on-demand.
// export const dynamicParams = true; // or false, to 404 on unknown paths

// export async function generateStaticParams() {
//   try {
//     const Links = await PostService().getLinks();
//     const posts: string[] = [];
//     Links.map((category) => {
//       category.Subject.map((sub) => {
//         sub.Series.map((series) => {
//           series.Post.map((post) => {
//             posts.push(post.id + "-" + post.url);
//           });
//         });
//       });
//     });

//     console.log(`Generating static params for ${posts.length} posts`);
//     return posts.map((post) => ({
//       post: post,
//     }));
//   } catch (error) {
//     console.error("Error in generateStaticParams:", error);
//     // 에러가 발생해도 빌드가 중단되지 않도록 빈 배열 반환
//     return [];
//   }
// }

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

  const [markdownsource] = await Promise.all([
    PostService().getPost({ post_id: post.split("-")[0] }),
    PostService().viewIncrement({ post_id: post.split("-")[0] }),
  ]);

  return (
    <>
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
