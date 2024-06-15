import Link from "next/link";

type Props = {
  params: {
    category: string;
  };
};

// function SubjectList(category: string) {
//   const fs = require("fs");
//   const path = `${process.cwd()}/src/posts/${category}`;
//   return fs.readdirSync(path);
// }

const Category = async ({ params }: Props) => {
  const subjectlist = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/subjectlist?categoryurl=${params.category}`,
    { next: { revalidate: 60 } },
  )
    .then((res) => res.json())
    .then((data) => data.data);
  return (
    <div>
      <Link className={"category"} href={`/blog/${params.category}`}>
        {params.category}
      </Link>
      {subjectlist &&
        subjectlist.map((subject: any, idx: number) => (
          <Link
            key={idx}
            href={`/blog/${params.category}/${subject.url}`}
            className={"subject hover:subject text-white hover:underline"}
          >
            {subject.nameko}
          </Link>
        ))}
    </div>
  );
};
export default Category;
