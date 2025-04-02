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
import dayjs from "dayjs";
import Giscus from "@/components/posts/Giscus";
import { PostService } from "@/config/apis";

export async function generateMetadata(
  props: {
    params: Promise<{ post: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const markdownsource = await PostService().getPost({ post_id: params.post });
  return GenerateMeta({ meta: markdownsource, param: params.post });
}
const Post = async (props0: { params: Promise<{ post: string }> }) => {
  const params = await props0.params;
  const markdownsource = await PostService().getPost({ post_id: params.post });
  await PostService().viewIncrement({ post_id: params.post.split("-")[0] });

  const dateString = dayjs(markdownsource.init_date)
    .locale("ko")
    .format("YYYY년 MM월 DD일");

  return (
    <>
      <Toup />
      <Suspense fallback={<Loading />}>
        <BreadCrumb params={markdownsource} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <MdxHeader
          props={{
            nameko: markdownsource.nameko,
            name: markdownsource.name,
            thumbnail_url: markdownsource.thumbnail_url,
          }}
        />
        <div className={"ml-auto text-right"}>{"📅 " + dateString}</div>
        <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
          <RightSidebarComp content={markdownsource.posting} />
          <MdxBody content={markdownsource.posting} />
        </div>
        <Giscus />
      </Suspense>
      <Todown />
    </>
  );
};
export default Post;
