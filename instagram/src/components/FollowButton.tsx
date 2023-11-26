"use client";

import { ProfileUser } from "@/app/model/user";
import useMe from "@/hooks/useMe";

import Button from "./ui/Button";

interface Props {
  user: ProfileUser;
}

const FollowButton = ({ user: { username } }: Props) => {
  const { user: loggedInUser } = useMe();

  const showButton = loggedInUser?.username !== username;
  const following = loggedInUser?.following.find(
    (item) => item.username === username,
  );
  const text = following ? "Unfollow" : "Follow";
  return <>{showButton && <Button text={text} onClick={() => {}} red />}</>;
};

export default FollowButton;
