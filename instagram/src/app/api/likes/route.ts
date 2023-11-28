import { NextRequest, NextResponse } from "next/server";

import { dislikePost, likePost } from "@/service/posts";
import { withSession } from "@/utils/session";

export async function PUT(req: NextRequest) {
  return withSession(async (user) => {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(id, user.id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new NextResponse(JSON.stringify(err), { status: 500 }));
  });
}
