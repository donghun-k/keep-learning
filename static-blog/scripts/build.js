import fs from 'fs-extra';
import config from '../config.js';
import Mustache from 'mustache';

const DIST = config.build.dist;
const PAGES = config.build.pages;

async function renderFile(source, dest) {
  const file = await fs.readFile(source);
  const result = Mustache.render(file.toString(), config);
  await fs.writeFile(dest, result);
}

async function build() {
  await fs.mkdir(DIST);

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

build();
