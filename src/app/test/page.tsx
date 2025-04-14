import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { getPostDetail } from "@/lib/PostUtils/GetPost";
import AutoRefresh from "../AutoRefresh";

const Post = async () => {
  const markdownsource = await getPostDetail();
  return (
    <>
      <Toup />
      <div className="prose dark:prose-invert mt-10 min-h-[100vh] scroll-smooth focus:scroll-auto">
        <RightSidebarComp content={markdownsource.content} />
        <Suspense fallback={<div>Loading...</div>}>
          <AutoRefresh>
            <MdxBody content={markdownsource.content} isDev={true} />
          </AutoRefresh>
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
