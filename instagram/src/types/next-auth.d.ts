import { User } from "@/app/model/user";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
