import fs from "node:fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { dbtable } from "@/config/types";
import { serialize } from "next-mdx-remote/serialize";
type Props = {
  params: {
    category: string;
    title: string;
  };
};
const MyComponent = () => {
  return (
    <div>
      <h1>hihihi</h1>
      <button>Click me</button>
      <p>Count: 1</p>
    </div>
  );
};
const components = { MyComponent };
const Post = async ({ params }: Props) => {
  const markdownsource: dbtable[] = await fetch(`${process.env.API_URL}/api`, {
    cache: "no-store",
  }).then((res) => res.json());
  // const markdownsource = fs.readFileSync(
  //   `${process.cwd()}/src/posts/${params.category}/${params.title}/content.mdx`,
  //   // "utf8",
  // );
  return (
    <>
      <div className="prose text-white">
        <h1 className={"text-white"}>Post</h1>
        <h2 className={"text-white"}>Category: {params.category}</h2>
        <h3 className={"text-white"}>Title: {params.title}</h3>
        {/*<MDXRemote*/}
        {/*  source={markdownsource}*/}
        {/*  components={components}*/}
        {/*  options={{ parseFrontmatter: true }}*/}
        {/*/>*/}
        {markdownsource.map((data: dbtable, idx: any) => (
          <div key={idx}>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.date.toString()}</p>
            <p>{data.thumbnail}</p>
            <MDXRemote
              source={data.content}
              components={components}
              options={{ parseFrontmatter: true }}
            />
            <br />
          </div>
        ))}
      </div>
    </>
  );
};
export default Post;
