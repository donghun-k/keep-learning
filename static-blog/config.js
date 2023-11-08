export default {
  build: {
    contents: 'contents',
    pages: 'pages',
    dist: 'dist',
    contentsSlug: 'post',
  },
  site: {
    title: 'My Blog',
    author: 'DongHun, Kim',
  },
  updatePost(post) {
    post.created_at = post.created_at.toLocaleDateString();
    return post;
  },
};
