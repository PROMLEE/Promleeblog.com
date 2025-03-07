import Link from "next/link";
import { TagsService } from "@/config/apis/service/tags";
import { Cards } from "@/components/posts/Cards";

type Props = {
  params: {
    id: string;
  };
};

const Tags = async ({ params }: Props) => {
  const postList = await TagsService().getPostLink({
    tag_id: parseInt(params.id.split("-")[0]),
  });
  return (
    <div>
      <h2 className="mb-3 mt-7 text-2xl font-bold">
        # {params.id.split("-")[1].replace("%20", " ")}
      </h2>
      <div className="flex w-full flex-wrap gap-3">
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
