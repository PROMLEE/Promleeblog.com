import { GetPostApiResponse } from "@/config/types/ApiResponse";
import { urlParams } from "@/config/types/types";
import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { Metadata } from "next";
import { getPostDetail } from "@/utils/PostUtils/GetPost";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { Pw } from "@/components/Pw";

type Props = {
  params: params;
};

interface params {
  category: string;
  subject: string;
  post: string;
}

export async function generateMetadata({
  params,
}: {
  params: urlParams;
}): Promise<Metadata> {
  const markdownsource = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post?id=${params.post}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return GenerateMeta({ meta: markdownsource, params });
}

const Post = async ({ params }: Props) => {
  const markdownsource = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post?id=${params.post}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return (
    <>
      <Toup />
      <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
        {markdownsource.lock && <Pw />}
        <Suspense fallback={<div>Loading...</div>}>
          <RightSidebarComp content={markdownsource.posting} />
          <BreadCrumb params={params} date={markdownsource.date} />
          <MdxHeader props={markdownsource.nameko} />
          <MdxBody content={markdownsource.posting} />
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
