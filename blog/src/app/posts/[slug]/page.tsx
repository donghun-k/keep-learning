import Image from 'next/image';

import { getPostData } from '@/service/posts';
import PostContent from '@/components/PostContent';
import AdjacentPostCard from '@/components/AdjacentPostCard';

interface Props {
  params: {
    slug: string;
  };
}
const PostPage = async ({ params: { slug } }: Props) => {
  const post = await getPostData(slug);
  const { title, path, next, prev } = post;
  return (
    <article className="m-4 overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
      <Image
        className="max-h-[500px] w-full"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={760}
        height={420}
      />
      <PostContent post={post} />
      <section className="flex shadow-md">
        {prev && <AdjacentPostCard post={prev} type="prev" />}
        {next && <AdjacentPostCard post={next} type="next" />}
      </section>
    </article>
  );
};

export default PostPage;
