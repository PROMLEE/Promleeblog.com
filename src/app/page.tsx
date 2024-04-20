import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/api`, {
    cache: "no-store",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

function CategoryList() {
  const fs = require("fs");
  const path = `${process.cwd()}/src/posts`;
  return fs.readdirSync(path);
}

export default async function Home() {
  const { result } = await getData();
  return (
    <div>
      Hello, Next js
      {CategoryList().map((category: string, idx: any) => (
        <div key={idx}>
          <Link href={`/blog/${category}`}>{category}</Link>
        </div>
      ))}
      <br />
      {result.mockUser.user_email}
      <br />
    </div>
  );
}
