import { NextRequest, NextResponse } from "next/server";

import { follow, unfollow } from "@/service/user";
import { withSession } from "@/utils/session";

export async function PUT(req: NextRequest) {
  return withSession(async (user) => {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || follow === undefined) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const request = isFollow ? follow : unfollow;

    return request(user.id, targetId)
      .then((res) => NextResponse.json(res))
      .catch((err) => new NextResponse(JSON.stringify(err), { status: 500 }));
  });
}
