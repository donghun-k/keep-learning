import { getFeaturedPosts } from '@/service/posts';

import PostsGrid from './PostsGrid';

const FeaturedPosts = async () => {
  const posts = await getFeaturedPosts();
  return (
    <section>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
