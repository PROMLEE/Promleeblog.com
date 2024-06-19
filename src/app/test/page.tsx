import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { getPostDetail } from "@/utils/PostUtils/GetPost";
import { createClient } from "@/utils/Supabase/supabase_server";

const Post = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("Category").select(`
    name,
    Subject (
      name,
      Series (
        name,
        Subject (
          name
        ),
        Post (
          name
        )
      )
    )
  `);
  const jsondata = JSON.stringify(data, null, 2);
  // console.log(jsondata);
  const markdownsource: any = await getPostDetail({});
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
