import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { getPostDetail } from "@/utils/PostUtils/GetPost";

const Post = async () => {
  // const markdownsource = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`,
  //   { next: { revalidate: 60 } },
  // )
  //   .then((res) => res.json())
  //   .then((data) => data.data);
  const markdownsource: any = await getPostDetail({
    category: "Computer_Science",
    subject: "Wireless_Mobile_Communications",
    // subject: "Network",
    title: "Concept",
    post: "03",
  });
  return (
    <>
      <Toup />
      <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
        <RightSidebarComp content={markdownsource.content} />
        <Suspense fallback={<div>Loading...</div>}>
          {/* <MdxHeader props={markdownsource.nameko} /> */}
          <MdxBody content={markdownsource.content} />
        </Suspense>
      </div>
      <Todown />
    </>
  );
};
export default Post;
