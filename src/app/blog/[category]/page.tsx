type Props = {
  params: {
    category: string;
  };
};
const Post = async ({ params }: Props) => {
  // const post = await getPostDetail(params.category, params.id);
  return (
    <div className="prose">
      <h1>Post</h1>
      <h2>Category: {params.category}</h2>
    </div>
  );
};
export default Post;
