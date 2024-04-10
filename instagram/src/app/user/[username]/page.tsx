import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";

import { getUserForProfile } from "@/service/user";
import UserProfile from "@/components/UserProfile";
import UserPost from "@/components/UserPost";

interface Props {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string) => getUserForProfile(username));

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) • Instagram Photos`,
    description: `${user?.name}'s all Instagram posts`,
  };
};

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUser(username);

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
