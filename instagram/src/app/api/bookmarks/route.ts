import { NextRequest, NextResponse } from "next/server";

import { addBookmark, removeBookmark } from "@/service/user";
import { withSession } from "@/utils/session";

export async function PUT(req: NextRequest) {
  return withSession(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new NextResponse(JSON.stringify(err), { status: 500 }));
  });
}
