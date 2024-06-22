import RightSidebarComp from "@/components/bars/RightSidebar";
import { Suspense } from "react";
import { Toup } from "@/components/buttons/Toup";
import { Todown } from "@/components/buttons/Todown";
import { MdxBody } from "@/components/posts/MdxBody";
import { MdxHeader } from "@/components/posts/MdxHeader";
import { Metadata } from "next";
import { GenerateMeta } from "@/utils/PostUtils/GenerateMeta";
import { BreadCrumb } from "@/components/posts/BreadCrumb";
import { Loading } from "@/components/Loading";
// import { createClient } from "@/utils/Supabase/supabase_server";

// const getData = async ({ params }: { params: { post: string } }) => {
//   const id = params.post.split("-")[0];
//   const rest = params.post.split("-").slice(1).join("-");
//   const supabase = createClient();
//   const { data }: { data: any } = await supabase
//     .from("Post")
//     .select(
//       `*, Series!inner(nameko, url, Subject!inner(nameko,url, Category!inner(url,nameko)))`,
//     )
//     .eq("id", `${id}`)
//     .eq("url", `${rest}`)
//     .maybeSingle();
//   return data;
// };

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
  // const markdownsource = await getData({ params });
  return GenerateMeta({ meta: markdownsource, param: params.post });
}
const Post = async ({ params }: { params: { post: string } }) => {
  // const markdownsource = await getData({ params });
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
      <Suspense fallback={<Loading />}>
        <BreadCrumb params={markdownsource} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <MdxHeader
          props={{ nameko: markdownsource.nameko, name: markdownsource.name }}
        />
        <div className="prose mt-10 min-h-[100vh] scroll-smooth dark:prose-invert focus:scroll-auto">
          <RightSidebarComp content={markdownsource.posting} />
          <MdxBody content={markdownsource.posting} />
        </div>
      </Suspense>
      <Todown />
    </>
  );
};
export default Post;
