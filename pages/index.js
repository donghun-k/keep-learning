import { Fragment } from 'react';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';

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

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
};
export default HomePage;
