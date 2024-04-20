import fs from "node:fs";
import { MDXRemote } from "next-mdx-remote/rsc";
type Props = {
  params: {
    category: string;
    title: string;
  };
};
const Post = async ({ params }: Props) => {
  // const post = await getPostDetail(params.category, params.id);

  const markdownsource = fs.readFileSync(
    `${process.cwd()}/src/posts/${params.category}/${params.title}/content.mdx`,
    "utf8",
  );

  return (
    <div className="prose">
      <h1>Post</h1>
      <h2>Category: {params.category}</h2>
      <h3>Title: {params.title}</h3>
      <MDXRemote
        source={markdownsource}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        }}
      />
    </div>
  );
};
export default Post;
