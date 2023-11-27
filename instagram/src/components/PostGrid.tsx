"use client";
import dynamic from "next/dynamic";

import usePosts from "@/hooks/usePosts";

import PostGridCard from "./PostGridCard";

const GridLoader = dynamic(() => import("react-spinners/GridLoader"), {
  ssr: false,
});

const PostGrid = () => {
  const { posts, isLoading } = usePosts();
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
