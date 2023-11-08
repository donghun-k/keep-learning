import fs from 'fs-extra';
import config from '../config.js';
import Mustache from 'mustache';
import frontMatter from 'front-matter';
import Showdown from 'showdown';

const DIST = config.build.dist;
const PAGES = config.build.pages;
const CONTENTS = config.build.contents;
const COTENTS_SLUG = config.build.contentsSlug;

async function renderFile(source, dest) {
  const recentPosts = await getRecentPosts();
  const file = await fs.readFile(source);
  const result = Mustache.render(file.toString(), { ...config, recentPosts });
  await fs.writeFile(dest, result);
}

async function getRecentPosts() {
  const files = await fs.readdir(CONTENTS);
  const result = [];
  for (const file of files) {
    const content = await fs.readFile(`${CONTENTS}/${file}/index.md`);
    const { attributes } = frontMatter(content.toString());
    result.push({
      ...attributes,
      path: `/${COTENTS_SLUG}/${attributes.slug}`,
    });
  }
  return result;
}

async function buildHTMLFiles() {
  const files = await fs.readdir(PAGES);

  for (const file of files) {
    if (file === 'index.html') {
      await renderFile(`${PAGES}/${file}`, `${DIST}/index.html`);
    } else {
      const folderName = file.replace('.html', '');
      await fs.mkdir(`${DIST}/${folderName}`);
      await fs.copy(`${PAGES}/${file}`, `${DIST}/${folderName}/index.html`);
    }
  }
}

async function buildContentsFiles() {
  const files = await fs.readdir(CONTENTS);

  await fs.mkdir(`${DIST}/${COTENTS_SLUG}`);

  for (const file of files) {
    const content = await fs.readFile(`${CONTENTS}/${file}/index.md`);
    const { attributes, body } = frontMatter(content.toString());

    const template = await fs.readFile('templates/post.html');
    const bodyHtml = new Showdown.Converter().makeHtml(body);

    const html = Mustache.render(template.toString(), {
      ...config,
      post: config.updatePost({ ...attributes, body: bodyHtml }),
    });

    await fs.mkdir(`${DIST}/${COTENTS_SLUG}/${file}`);
    await fs.writeFile(`${DIST}/${COTENTS_SLUG}/${file}/index.html`, html);
  }
}

async function build() {
  await fs.mkdir(DIST);
  await buildHTMLFiles();
  await buildContentsFiles();
}

build();
