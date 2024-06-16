import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { Metadata } from "next";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { Pw } from "@/components/Pw";

export async function generateMetadata({
  params,
}: {
  params: { post: string };
}): Promise<Metadata> {
  const markdownsource = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post?id=${params.post}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return GenerateMeta({ meta: markdownsource, param: params.post });
}

const Post = async ({ params }: { params: { post: string } }) => {
  let markdownsource;
  try {
    markdownsource = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post?id=${params.post}`,
      { next: { revalidate: 60 } },
    )
      .then((res) => res.json())
      .then((data) => data.data);
  } catch (e) {
    markdownsource = {
      posting: "# Hello World",
      name: "Hello World",
      nameko: "Hello World",
    };
  }
  return (
    <>
      <Toup />
      <Suspense fallback={<div>Loading...</div>}>
        <BreadCrumb params={markdownsource} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MdxHeader props={markdownsource.nameko} />
        <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
          {markdownsource.lock && <Pw />}
          <RightSidebarComp content={markdownsource.posting} />
          <MdxBody content={markdownsource.posting} />
        </div>
      </Suspense>
      <Todown />
    </>
  );
};
export default Post;
