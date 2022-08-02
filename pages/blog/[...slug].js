import { useRouter } from 'next/router';

const BlogPostsPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>The Blog Posts</h1>
      <h2>{router.query.slug[0]}</h2>
      <h2>{router.query.slug[1]}</h2>
    </div>
  );
};

export default BlogPostsPage;
