import { NextRequest, NextResponse } from "next/server";

import { addComment } from "@/service/posts";
import { withSession } from "@/utils/session";

export async function POST(req: NextRequest) {
  return withSession(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment === undefined) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    return addComment(id, user.id, comment)
      .then((res) => NextResponse.json(res))
      .catch((err) => new NextResponse(JSON.stringify(err), { status: 500 }));
  });
}
