"use client";
import { useState } from "react";

import { ProfileUser } from "@/app/model/user";

import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";

interface Props {
  user: ProfileUser;
}

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="h-3 w-3" /> },
  { type: "liked", icon: <HeartIcon className="h-3 w-3" /> },
];

const UserPost = ({ user: { username } }: Props) => {
  const [query, setQuery] = useState(tabs[0].type);
  return (
    <section>
      <ul className="flex justify-center uppercase ">
        {tabs.map(({ type, icon }) => {
          return (
            <li
              className={`m-12 cursor-pointer border-black p-4 ${
                type === query && "border-t font-bold"
              }`}
              key={type}
            >
              <button
                onClick={() => setQuery(type)}
                className="scale-150 md:scale-100"
              >
                {icon}
              </button>
              <span className="hidden md:inline">{type}</span>
            </li>
          );
        })}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
};

export default UserPost;
