import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export interface Post {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
}

export interface PostData extends Post {
  content: string;
  next: Post | null;
  prev: Post | null;
}

export const getNonFeaturedPosts = async (): Promise<Post[]> => {
  return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
};

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

export const getPostData = async (fileName: string): Promise<PostData> => {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) {
    throw new Error(`${fileName} not found`);
  }

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const content = await readFile(filePath, 'utf-8');
  return { ...post, content, next, prev };
};
