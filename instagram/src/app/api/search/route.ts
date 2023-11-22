import { NextResponse } from "next/server";

import { searchUsers } from "@/service/user";

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
