import { notFound } from "next/navigation";

import { getUserForProfile } from "@/service/user";
import UserProfile from "@/components/UserProfile";
import UserPost from "@/components/UserPost";

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
  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPost user={user} />
    </section>
  );
};

export default UserPage;
