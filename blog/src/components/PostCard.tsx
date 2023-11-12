import Link from 'next/link';
import Image from 'next/image';

import { Post } from '@/service/posts';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { title, description, date, category, path } = post;
  return (
    <Link href={`/posts/${path}`}>
      <article className="overflow-hidden rounded-md shadow-lg">
        <Image
          className="w-full"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={300}
          height={200}
        />
        <div className="flex flex-col items-center p-4">
          <time className="self-end">{date.toString()}</time>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="w-full truncate text-center">{description}</p>
          <span className="my-2 rounded-lg bg-green-100 px-2 text-sm">
            {category}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
