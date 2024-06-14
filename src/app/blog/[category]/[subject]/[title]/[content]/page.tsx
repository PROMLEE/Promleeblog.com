import { urlParams } from "@/config/types";
import RightSidebarComp from "@/components/bars/RightSidebar";
import { CategoryKo } from "@/config/koname";
import { Pw } from "@/components/Pw";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { Metadata } from "next";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { getPostDetail } from "@/lib/PostUtils/GetPost";

type Props = {
  params: urlParams;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: any,
): Promise<Metadata> {
  // read route params
  const id = params.title;
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: id,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

const Post = async ({ params }: { params: urlParams }) => {
  const post = await getPostDetail(params);
  return (
    <>
      <Toup />
      <Suspense fallback={<div>Loading...</div>}>
        {CategoryKo[params.category].lock && <Pw />}
      </Suspense>
      <BreadCrumb params={params} />
      <RightSidebarComp content={post.content} />
      <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <MdxHeader props={post} />
          <MdxBody content={post.content} />
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
