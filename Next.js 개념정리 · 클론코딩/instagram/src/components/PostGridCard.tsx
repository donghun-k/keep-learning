import Image from "next/image";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { SimplePost } from "@/app/model/post";

import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

interface Props {
  post: SimplePost;
  priority: boolean;
}

const PostGridCard = ({ post, priority }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { image, username } = post;
  const { data: session } = useSession();
  const handleOpenPost = () => {
    if (!session?.user) return signIn();
    setOpenModal(true);
  };
  return (
    <div className="relative aspect-square w-full">
      <Image
        className="object-cover"
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
};

export default PostGridCard;
