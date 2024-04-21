import { MDXRemote } from "next-mdx-remote/rsc";
import { dbtable } from "@/config/types";
import { CustomButton, AlertBox } from "@/components/mdx/Comps";

type Props = {
  params: {
    category: string;
    title: string;
  };
};

const MyComponents = {
  CustomButton,
  AlertBox,
  p: CustomButton,
  h2: CustomButton,
};

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
        {/*  components={{ CustomButton, AlertBox }}*/}
        {/*  options={{ parseFrontmatter: true }}*/}
        {/*/>*/}
        {markdownsource.map((data: dbtable, idx: any) => (
          <div key={idx}>
            <h1 className={"text-pink-600 hover:text-amber-500"}>
              {data.title}
            </h1>
            <p>{data.description}</p>
            <p>{data.date.toString()}</p>
            <p>{data.thumbnail}</p>
            <MDXRemote
              source={data.content}
              components={MyComponents}
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
