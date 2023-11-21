import Image from "next/image";

import { SimplePost } from "@/app/model/post";

import Avatar from "./ui/Avatar";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

interface Props {
  post: SimplePost;
  priority?: boolean;
}

const PostListCard = ({ post, priority = false }: Props) => {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="ml-2 font-bold text-gray-900">{username}</span>
      </div>
      <Image
        className="aspect-square w-full object-cover"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
};

export default PostListCard;
