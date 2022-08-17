import AllPosts from '../../components/posts/all-post';

const DUMMY_POSTS = [
  {
    title: 'Getting started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Studying Next.js',
    date: '2022-02-02',
    slug: 'getting-started-with-nextjs',
  },
  {
    title: 'Getting started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Studying Next.js',
    date: '2022-02-02',
    slug: 'getting-started-with-nextjs2',
  },
  {
    title: 'Getting started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Studying Next.js',
    date: '2022-02-02',
    slug: 'getting-started-with-nextjs3',
  },
];

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};
export default AllPostsPage;
