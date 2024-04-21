import { NextResponse } from "next/server";
import handleMySql from "@/config/db";
import { dbtable } from "@/config/types";

export async function GET() {
  const query = "SELECT * FROM topic";
  const db = await handleMySql(query, "");
  return NextResponse.json(db);
}
