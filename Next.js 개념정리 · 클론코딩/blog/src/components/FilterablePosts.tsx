'use client';
import { useState } from 'react';

import { Post } from '@/service/posts';

import PostsGrid from './PostsGrid';
import Categories from './Categories';

interface Props {
  posts: Post[];
  categories: string[];
}
const ALL_POSTS = 'All';
const FilterablePosts = ({ posts, categories }: Props) => {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filteredPosts =
    selected === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selected);
  return (
    <section className="m-4 flex">
      <PostsGrid posts={filteredPosts} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        selected={selected}
        onClick={setSelected}
      />
    </section>
  );
};

export default FilterablePosts;
