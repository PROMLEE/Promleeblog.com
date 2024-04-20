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

export default async function Home() {
  const { result } = await getData();
  return (
    <div>
      Hello, Next js
      <br />
      {result.mockUser.user_email}
      <br />
      <Link href={"/blog"}>To List</Link>
    </div>
  );
}
