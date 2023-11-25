import useSWR from "swr";

import { SimplePost } from "@/app/model/post";

const updateLike = async (id: string, like: boolean) => {
  return fetch("api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
};

const usePosts = () => {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((item) =>
      item.id === post.id ? newPost : item,
    );

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike };
};

export default usePosts;
