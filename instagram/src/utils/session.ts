import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthUser } from "@/app/model/user";

export const withSession = async (
  handler: (user: AuthUser) => Promise<Response>,
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse("Authentication Error", { status: 401 });
  }

  return handler(user);
};
