"use client";

import useSWR from "swr";
import dynamic from "next/dynamic";

import { SimplePost } from "@/app/model/post";

import PostListCard from "../PostListCard";

const GridLoader = dynamic(() => import("react-spinners/GridLoader"), {
  ssr: false,
});

const PostList = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div className="mt-32 text-center">
          <GridLoader color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post, i) => (
              <li className="mb-4" key={post.id}>
                <PostListCard post={post} priority={i < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default PostList;
