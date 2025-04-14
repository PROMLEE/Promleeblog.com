import { NextResponse } from "next/server";
// import handleMySql from "@/config/db";

// export async function GET() {
//   const query = "SELECT * FROM posts";
//   const db = await handleMySql(query, "");

//   return NextResponse.json(db);
// }
export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
