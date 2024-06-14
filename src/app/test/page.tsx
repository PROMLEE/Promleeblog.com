import { GetPostApiResponse } from "@/config/types/ApiResponse";
import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";

const Post = async () => {
  // const markdownsource = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`,
  //   { next: { revalidate: 60 } },
  // )
  //   .then((res) => res.json())
  //   .then((data) => data.data);
  const markdownsource: GetPostApiResponse = {
    posting: "# Hello World",
    name: "Hello World",
    nameko: "Hello World",
  };
  return (
    <>
      <Toup />
      <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
        <RightSidebarComp content={markdownsource.posting} />
        <Suspense fallback={<div>Loading...</div>}>
          <MdxHeader props={markdownsource.nameko} />
          <MdxBody content={markdownsource.posting} />
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
