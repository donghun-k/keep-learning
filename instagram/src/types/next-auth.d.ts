import { AuthUser } from "@/app/model/user";

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
