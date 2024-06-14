import { urlParams } from "@/config/types";
import RightSidebarComp from "@/components/bars/RightSidebar";
import { Pw } from "@/components/Pw";
import { CategoryKo } from "@/config/koname";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { Metadata } from "next";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { getPostDetail } from "@/utils/PostUtils/GetPost";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta";

export async function generateMetadata({
  params,
}: {
  params: urlParams;
}): Promise<Metadata> {
  const post = await getPostDetail(params);
  return GenerateMeta({ meta: post, params });
}

const Post = async ({ params }: { params: urlParams }) => {
  const post = await getPostDetail(params);
  return (
    <>
      <Toup />
      <Suspense fallback={<div>Loading...</div>}>
        {CategoryKo[params.category].lock && <Pw />}
      </Suspense>
      <BreadCrumb params={params} date={post.date} />
      <MdxHeader
        props={
          params.content +
          ". " +
          CategoryKo[params.category].sub[params.subject].title[params.title]
            .content[params.content].name
        }
      />
      <RightSidebarComp content={post.content} />
      <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <MdxBody content={post.content} />
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
