import PostHeader from './post-header';

import classes from './post-content.module.css';

const DUMMY_POSTS = {
  title: 'Getting started with Next.js',
  image: 'getting-started-nextjs.png',
  content: '# Studying Next.js',
  date: '2022-02-02',
  slug: 'getting-started-with-nextjs',
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POSTS.slug}/${DUMMY_POSTS.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POSTS.title} image={imagePath} />
      {DUMMY_POSTS.content}
    </article>
  );
};

export default PostContent;
