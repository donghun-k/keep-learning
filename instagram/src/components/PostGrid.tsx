"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";

import { SimplePost } from "@/app/model/post";

import PostGridCard from "./PostGridCard";

const GridLoader = dynamic(() => import("react-spinners/GridLoader"), {
  ssr: false,
});

interface Props {
  username: string;
  query: string;
}

const PostGrid = ({ username, query }: Props) => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>(
    `/api/users/${username}/${query}`,
  );
  return (
    <div className="w-full text-center">
      {isLoading && <GridLoader />}
      <ul className="grid grid-cols-3 gap-4 px-8 py-4">
        {posts &&
          posts.map((post, i) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={i < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostGrid;
