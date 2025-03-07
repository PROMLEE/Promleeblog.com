import Link from "next/link";
import { TagsService } from "@/config/apis/service/tags";
import { Cards } from "@/components/posts/Cards";

type Props = {
  params: {
    id: string;
  };
};

const getTags = async (params: { id: string }) => {
  const postList = await TagsService().getPostLink({
    tag_id: parseInt(params.id.split("-")[0]),
  });
  return postList;
};

const Tags = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const tagsData = getTags({ id });
  const [postList] = await Promise.all([tagsData]);

  return (
    <div>
      <h2 className="mb-3 mt-7 text-2xl font-bold">
        # {id.split("-")[1].replace("%20", " ")}
      </h2>
      <div className="flex w-full flex-wrap gap-5">
        {postList.map((post, idx) => (
          <Link href={`/blog/post/${post.Post.id}-${post.Post.url}`} key={idx}>
            <Cards post={post.Post} idx={idx} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Tags;
