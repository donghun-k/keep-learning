"use client";

import { useState } from "react";

import { ProfileUser } from "@/app/model/user";
import useMe from "@/hooks/useMe";
import { revalidateUserProfile } from "@/actions/action";

import Button from "./ui/Button";

interface Props {
  user: ProfileUser;
}

const FollowButton = ({ user: { username, id } }: Props) => {
  const { user: loggedInUser, toggleFollow } = useMe();
  const [isUpdating, setIsUpdating] = useState(false);
  const showButton = loggedInUser?.username !== username;
  const following = loggedInUser?.following.find(
    (item) => item.username === username,
  );
  const text = following ? "Unfollow" : "Follow";

  const handleFollow = async () => {
    setIsUpdating(true);
    try {
      await toggleFollow(id, !following);
      await revalidateUserProfile(username);
      await revalidateUserProfile(loggedInUser?.username || "");
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <>
      {showButton && !isUpdating && (
        <Button text={text} onClick={handleFollow} red={!!following} />
      )}
      {isUpdating && <p>Updating...</p>}
    </>
  );
};

export default FollowButton;
