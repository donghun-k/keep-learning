import Image from 'next/image';
import { AiTwotoneCalendar } from 'react-icons/ai';

import MarkdownViewer from '@/components/MarkdownViewer';
import { getPostData } from '@/service/posts';

interface Props {
  params: {
    slug: string;
  };
}
const PostPage = async ({ params: { slug } }: Props) => {
  const { title, description, date, path, content } = await getPostData(slug);
  return (
    <article className="m-4 overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
      <Image
        className="max-h-[500px] w-full"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={760}
        height={420}
      />
      <section className="flex flex-col p-4">
        <div className="flex items-center self-end text-sky-600">
          <AiTwotoneCalendar />
          <p className="ml-2 font-semibold">{date.toString()}</p>
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl font-bold">{description}</p>
        <div className="mb-8 mt-4 w-44 border-2 border-sky-600"></div>
        <MarkdownViewer content={content} />
      </section>
    </article>
  );
};

export default PostPage;
