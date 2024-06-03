import React from 'react';
import data from './data';
import cx from './cx';
import VanillaWrapper from '../vanillaWrapper';

interface ListItemProps {
  id: string;
  title: string;
  description: string;
  index: number;
}

const generateListItem = ({ id, title, description, index }: ListItemProps) => {
  const $el = document.createElement('div');
  $el.classList.add(cx('listItem'));
  $el.id = id;
  $el.setAttribute('data-index', String(index));
  $el.insertAdjacentHTML(
    'afterbegin',
    `
      <h4>#${index + 1}. ${title}</h4>
      ${description
        .split('\r\n')
        .map((line) => `<p>${line}</p>`)
        .join('')}
    `
  );
  return $el;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $navItems = data.map((_, i) => {
    const $button = document.createElement('button');
    $button.textContent = String(i + 1);

    const $item = document.createElement('li');
    $item.classList.add(cx('navItem'));
    $item.appendChild($button);
    return $item;
  });

  const $navList = document.createElement('ul');
  $navList.classList.add(cx('nav'));
  $navList.append(...$navItems);

  const $header = document.createElement('header');
  $header.classList.add(cx('floatingHeader'));
  $header.insertAdjacentHTML(
    'afterbegin',
    `
      <h2 class="${cx('title')}">Scrollspy</h2>
      <h3 class="${cx('subTitle')}">#3. Vanilla</h3>
    `
  );
  $header.appendChild($navList);

  const $list = document.createElement('ul');
  data.forEach((d, i) =>
    $list.appendChild(generateListItem({ ...d, index: i }))
  );

  wrapper.classList.add(cx('ScrollSpy'));
  wrapper.appendChild($header);
  wrapper.appendChild($list);
};

const ScrollSpy3 = () => <VanillaWrapper initiator={initiator} />;

export default ScrollSpy3;
