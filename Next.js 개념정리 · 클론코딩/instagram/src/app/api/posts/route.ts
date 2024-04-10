import { NextRequest, NextResponse } from "next/server";

import { createPost, getFollowingPostsOf } from "@/service/posts";
import { withSession } from "@/utils/session";

export async function GET() {
  return withSession(async (user) => {
    return getFollowingPostsOf(user.username).then((data) =>
      NextResponse.json(data),
    );
  });
}

export async function POST(req: NextRequest) {
  return withSession(async (user) => {
    const form = await req.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    return createPost(user.id, text, file).then((data) =>
      NextResponse.json(data),
    );
  });
}
