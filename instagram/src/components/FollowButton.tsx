"use client";

import useSWR from "swr";

import { HomeUser, ProfileUser } from "@/app/model/user";

import Button from "./ui/Button";

interface Props {
  user: ProfileUser;
}

const FollowButton = ({ user: { username } }: Props) => {
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");

  const showButton = loggedInUser?.username !== username;
  const following = loggedInUser?.following.find(
    (item) => item.username === username,
  );
  const text = following ? "Unfollow" : "Follow";
  return <>{showButton && <Button text={text} onClick={() => {}} red />}</>;
};

export default FollowButton;
