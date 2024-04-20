async function getData() {
  const res = await fetch("http://localhost:3000/api", {
    cache: "no-store",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const { message, result } = await getData();
  return (
    <div>
      Hello, Next js
      <br />
      {result.mockUser.user_email}
    </div>
  );
}
