import PostItem from './post-item';
import classes from './posts-grid.module.css';

const PostsGrid = (props) => {
  const { posts } = props;
  return (
    <ul>
      {posts.map((post) => (
        <PostItem />
      ))}
    </ul>
  );
};

export default PostsGrid;
