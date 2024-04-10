"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import useMe from "@/hooks/useMe";

import Avatar from "./Avatar";
import ScrollableBar from "./ScrollableBar";

const PropagateLoader = dynamic(
  () => import("react-spinners/PropagateLoader"),
  { ssr: false },
);

const FollowingBar = () => {
  const { user, isLoading } = useMe();
  const users = user?.following;
  return (
    <section className="relative z-0 mb-4 flex min-h-[90px] w-full items-center justify-center overflow-x-auto rounded-lg p-4 shadow-sm shadow-neutral-300">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex w-20 flex-col items-center"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full overflow-hidden text-ellipsis text-center text-sm">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
};

export default FollowingBar;
