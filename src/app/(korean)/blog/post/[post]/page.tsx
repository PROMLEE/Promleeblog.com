import ArticleContent from "@/components/pages/ArticleContent";
import { articleMetadata } from "@/lib/i18n/metadata";
import { Metadata } from "next";
import { PostService } from "@/config/apis";

export const revalidate = 172800; // 2 days
export const dynamicParams = true;

export async function generateStaticParams() {
  const Links = await PostService().getLinks();
  const posts: string[] = [];
  Links.map((category) => {
    category.Subject.map((sub) => {
      sub.Series.map((series) => {
        series.Post.map((post) => {
          posts.push(post.id + "-" + post.url);
        });
      });
    });
  });
  return posts.map((post) => ({
    post: post,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ post: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const markdownsource = await PostService().getPostMeta({
    post_id: params.post,
  });
  return articleMetadata(markdownsource, params.post, "ko");
}

const Post = async ({ params }: { params: Promise<{ post: string }> }) => {
  const { post } = await params;

  const markdownsource = await PostService().getPost({
    post_id: post.split("-")[0],
  });

  return <ArticleContent markdownsource={markdownsource} />;
};

export default Post;
