import Image from "next/image";

import { SimplePost } from "@/app/model/post";
import usePost from "@/hooks/usePost";

import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./ui/Avatar";

interface Props {
  post: SimplePost;
}

const PostDetail = ({ post }: Props) => {
  const { id, userImage, username, image } = post;
  const { post: data, postComment } = usePost(id);
  const comments = data?.comments;

  return (
    <section className="flex h-full w-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="flex w-full basis-2/5 flex-col">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="bordergray200 mb-1 h-full overflow-y-auto border-t p-4">
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, i) => (
              <li key={i} className="mb-1 flex items-center">
                <Avatar
                  image={image}
                  size="small"
                  highlight={username === commentUsername}
                />
                <div className="ml-2">
                  <span className="mr-1 font-bold">{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
};

export default PostDetail;
