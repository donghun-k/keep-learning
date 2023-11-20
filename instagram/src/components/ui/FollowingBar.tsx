"use client";

import { DeatilUser } from "@/app/model/user";
import useSWR from "swr";
import PropagateLoader from "react-spinners/PropagateLoader";
import Link from "next/link";
import Avatar from "./Avatar";
import ScrollableBar from "./ScrollableBar";

const FollowingBar = () => {
  const { data, isLoading } = useSWR<DeatilUser>("/api/me");
  const users = data?.following;
  return (
    <section className="mb-4 flex min-h-[90px] w-full items-center justify-center overflow-x-auto rounded-lg p-4 shadow-sm shadow-neutral-300">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length && (
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
