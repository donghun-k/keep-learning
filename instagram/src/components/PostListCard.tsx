"use client";
import Image from "next/image";
import { useState } from "react";

import { SimplePost } from "@/app/model/post";

import CommentForm from "./CommentForm";
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
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);
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
      <ActionBar post={post} />
      <CommentForm />
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
