import { NextResponse } from "next/server";

import { getUserByUsername } from "@/service/user";
import { withSession } from "@/utils/session";

export async function GET() {
  return withSession(async (user) => {
    return getUserByUsername(user.username).then((data) =>
      NextResponse.json(data),
    );
  });
}
