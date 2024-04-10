import { NextRequest, NextResponse } from "next/server";

import { searchUsers } from "@/service/user";

interface Context {
  params: {
    keyword: string;
  };
}

export async function GET(_: NextRequest, context: Context) {
  return searchUsers(context.params.keyword).then((data) =>
    NextResponse.json(data),
  );
}
