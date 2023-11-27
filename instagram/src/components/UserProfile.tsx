import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { ProfileUser } from "@/app/model/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Avatar from "./ui/Avatar";
import FollowButton from "./FollowButton";

interface Props {
  user: ProfileUser;
}
const UserProfile = async ({ user }: Props) => {
  const session = await getServerSession(authOptions);
  const { image, username, name, followers, following, posts } = user;
  const info = [
    { title: "posts", data: posts },
    { title: "followers", data: followers },
    { title: "following", data: following },
  ];

  return (
    <section className="flex w-full flex-col items-center border-b border-neutral-300 py-12 md:flex-row">
      <Avatar image={image} highlight size="xlarge" />
      <div className="basis-1/3 md:ml-10">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="my-2 text-2xl md:mb-0 md:mr-8 ">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }) => (
            <li key={title}>
              <span className="mr-1 font-bold">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-center text-xl font-bold md:text-start">{name}</p>
      </div>
    </section>
  );
};

export default UserProfile;
