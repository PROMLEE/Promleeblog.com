import { NextResponse } from "next/server";
import handleMySql from "@/config/db";

export async function GET() {
  const query = "SELECT * FROM topic";
  const db = await handleMySql(query, "");
  return NextResponse.json(db);
}
