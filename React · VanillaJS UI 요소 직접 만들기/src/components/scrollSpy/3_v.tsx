import React from 'react';
import data from './data';
import cx from './cx';
import VanillaWrapper from '../vanillaWrapper';
import vanillaIntersectionObserverV2 from '@/hook/vanilla/intersectionObserverV2';

const HEADER_HEIGHT = 60;

const IO_OPTIONS: IntersectionObserverInit = {
  rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
  threshold: 0.5,
};
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
  let currentIndex = 0;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    const $target = entries[0]?.target as HTMLElement;
    const index = $target?.dataset.index;
    if (index === undefined) return;
    currentIndex = parseInt(index, 10);
    $navItems.forEach(($el, i) => {
      $el.classList.toggle(cx('current'), i === currentIndex);
    });
    $navItems[currentIndex]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'instant',
    });
  };

  const handleNavClick = (e: Event) => {
    const path = e.composedPath() as HTMLElement[];
    const $li = path.find((el) => el.localName === 'li');
    const index = parseInt($li?.dataset.index || '0', 10);
    const scrollTop = document.scrollingElement!.scrollTop;
    const itemY = $items[index].getBoundingClientRect().top || 0;
    const top = scrollTop + itemY - HEADER_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const $navItems = data.map((_, i) => {
    const $button = document.createElement('button');
    $button.textContent = String(i + 1);

    const $item = document.createElement('li');
    $item.classList.add(cx('navItem'));
    $item.setAttribute('data-index', String(i));
    $item.appendChild($button);
    return $item;
  });

  const $navList = document.createElement('ul');
  $navList.classList.add(cx('nav'));
  $navList.append(...$navItems);
  $navList.addEventListener('click', handleNavClick);

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
  const $items = data.map((d, i) => generateListItem({ ...d, index: i }));
  $list.append(...$items);

  vanillaIntersectionObserverV2($items, IO_OPTIONS, handleIntersect);

  wrapper.classList.add(cx('ScrollSpy'));
  wrapper.appendChild($header);
  wrapper.appendChild($list);
};

const ScrollSpy3 = () => <VanillaWrapper initiator={initiator} />;

export default ScrollSpy3;
