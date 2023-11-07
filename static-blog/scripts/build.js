import fs from 'fs-extra';

await fs.mkdir('dist');

const files = await fs.readdir('pages');

for (const file of files) {
  if (file === 'index.html') {
    await fs.copy(`pages/${file}`, 'dist/index.html');
  } else {
    const folderName = file.replace('.html', '');
    await fs.mkdir(`dist/${folderName}`);
    await fs.copy(`pages/${file}`, `dist/${folderName}/index.html`);
  }
}
