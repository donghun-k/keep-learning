"use client";

import { ProfileUser } from "@/app/model/user";
import useMe from "@/hooks/useMe";

import Button from "./ui/Button";

interface Props {
  user: ProfileUser;
}

const FollowButton = ({ user: { username, id } }: Props) => {
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser?.username !== username;
  const following = loggedInUser?.following.find(
    (item) => item.username === username,
  );
  const text = following ? "Unfollow" : "Follow";

  const handleFollow = () => {
    toggleFollow(id, !following);
  };
  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} red={!!following} />
      )}
    </>
  );
};

export default FollowButton;
