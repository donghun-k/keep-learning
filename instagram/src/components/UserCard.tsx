import Link from "next/link";

import { ProfileUser } from "@/app/model/user";

import Avatar from "./ui/Avatar";

interface Props {
  user: ProfileUser;
}

const UserCard = ({
  user: { name, username, image, following, followers },
}: Props) => {
  return (
    <Link
      href={`/user/${username}`}
      className="mb-2 flex items-center rounded-sm border border-neutral-300 bg-white p-4 hover:bg-neutral-50"
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="font-bold leading-4 text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers • ${following} following`}</p>
      </div>
    </Link>
  );
};

export default UserCard;
