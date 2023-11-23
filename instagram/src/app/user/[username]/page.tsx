import { notFound } from "next/navigation";

import { getUserForProfile } from "@/service/user";
import UserProfile from "@/components/UserProfile";

interface Props {
  params: {
    username: string;
  };
}

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }
  return <UserProfile user={user} />;
};

export default UserPage;
