import fs from "node:fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { dbtable } from "@/config/types";
type Props = {
  params: {
    category: string;
    title: string;
  };
};
const Post = async ({ params }: Props) => {
  const data: dbtable[] = await fetch(`${process.env.API_URL}/api`, {
    cache: "no-store",
  }).then((res) => res.json());
  console.log(data[2].description);
  const markdownsource = fs.readFileSync(
    `${process.cwd()}/src/posts/${params.category}/${params.title}/content.mdx`,
    "utf8",
  );
  return (
    <div className="prose text-white">
      <h1 className={"text-white"}>Post</h1>
      <h2 className={"text-white"}>Category: {params.category}</h2>
      <h3 className={"text-white"}>Title: {params.title}</h3>
      {data.map((data: dbtable, idx: any) => (
        <div key={idx}>
          <h1>{data.title}</h1>
          <MDXRemote
            source={data.description}
            options={{ parseFrontmatter: true }}
          />
          <p>{data.created.toString()}</p>
          <p>{data.author}</p>
          <p>{data.profile}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
export default Post;
