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
  return (
    <>
      <div className="prose text-white">
        <div>Category: {params.category}</div>
        <div>Title: {params.title}</div>
        {data.map((data: dbtable, idx: any) => {
          return (
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
          );
        })}
      </div>
    </>
  );
};
export default Post;
