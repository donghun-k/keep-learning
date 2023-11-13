import { readFile } from 'fs/promises';
import path from 'path';

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
}

export const getNonFeaturedPosts = async (): Promise<Post[]> => {
  return getAllPosts().then((posts) => posts.filter((post) => !post.featured));
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  return getAllPosts().then((posts) => posts.filter((post) => post.featured));
};

export const getAllPosts = async (): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
};

export const getPostData = async (fileName: string): Promise<PostData> => {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const metadata = await getAllPosts().then((posts) =>
    posts.find((post) => post.path === fileName)
  );
  if (!metadata) {
    throw new Error(`${fileName} not found`);
  }
  const content = await readFile(filePath, 'utf-8');
  return { ...metadata, content };
};
