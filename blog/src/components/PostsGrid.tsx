import { Post } from '@/service/posts';

import PostCard from './PostCard';

interface Props {
  posts: Post[];
}

const PostsGrid = ({ posts }: Props) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post, li) => (
        <li key={post.path}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostsGrid;
