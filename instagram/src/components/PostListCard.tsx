"use client";
import Image from "next/image";
import { useState } from "react";

import { Comment, SimplePost } from "@/app/model/post";
import usePosts from "@/hooks/usePosts";

import ActionBar from "./ActionBar";
import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

interface Props {
  post: SimplePost;
  priority?: boolean;
}

const PostListCard = ({ post, priority = false }: Props) => {
  const { userImage, username, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg border border-gray-200 shadow-md">
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="aspect-square w-full object-cover"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="my-2 font-bold text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
};

export default PostListCard;
