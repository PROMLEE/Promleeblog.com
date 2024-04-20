type Props = {
  params: {
    category: string;
    id: string;
  };
};
const Post = async ({ params }: Props) => {
  // const post = await getPostDetail(params.category, params.id);
  return (
    <div className="prose">
      <h1>Post</h1>
      <h2>Category: {params.category}</h2>
      <h3>ID: {params.id}</h3>
    </div>
  );
};
export default Post;
