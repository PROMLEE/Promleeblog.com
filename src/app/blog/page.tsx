import Link from "next/link";

type Props = {
  params: {
    category: string;
  };
};

const Post = async ({ params }: Props) => {
  // const post = await getPostDetail(params.category, params.id);
  return (
    <div>
      <Link href={"/blog/test/first"}>To post</Link>
    </div>
  );
};

export default Post;
