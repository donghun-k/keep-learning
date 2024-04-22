import { useState } from 'react';
import cx from './cx';
import data from './data';
import VanillaWrapper from '../vanillaWrapper';

const buildTabMenus = ({ id, title }: { id: string; title: string }) => {
  const $li = document.createElement('li');
  $li.classList.add(cx('tab'));
  $li.textContent = title;
  $li.setAttribute('data-id', id);
  return $li;
};

const buildDescriptions = ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  const $div = document.createElement('div');
  $div.classList.add(cx('description'));
  $div.textContent = description;
  $div.setAttribute('data-id', id);
  return $div;
};

const initiator = (wrapper: HTMLElement) => {
  let currentId: string = data[0].id;
  const $container = document.createElement('div');
  $container.classList.add(cx('container'), cx('tabMenu2'));

  const $tabUl = document.createElement('ul');
  $tabUl.classList.add(cx('tabList'));

  const $tabList = data.map(buildTabMenus);
  const $descriptions = data.map(buildDescriptions);

  $tabUl.append(...$tabList);
  $container.append($tabUl, ...$descriptions);

  const handleClickTab = (e: Event) => {
    const $el = e.target as HTMLElement;
    if (!$el.classList.contains(cx('tab'))) return;

    currentId = $el.dataset.id || data[0].id;

    $tabList.forEach(($tab) => {
      $tab.classList.toggle(cx('current'), currentId === $tab.dataset.id);
    });
    $descriptions.forEach(($description) => {
      $description.classList.toggle(
        cx('current'),
        currentId === $description.dataset.id
      );
    });
  };
  $tabUl.addEventListener('click', handleClickTab);

  wrapper.append($container);

  $tabList[0].click();
};

const TabMenu4 = () => <VanillaWrapper title="#4" initiator={initiator} />;

export default TabMenu4;
