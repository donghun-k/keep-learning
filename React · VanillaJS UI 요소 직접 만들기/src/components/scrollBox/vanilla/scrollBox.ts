import { lazyImageBuilder } from '@/components/lazyLoading/2_v';
import cx from '../cx';
import data from '../data';
import vanillaIntersectionObserverV2 from '@/hook/vanilla/intersectionObserverV2';

type ItemElementType = HTMLLIElement | null;
type Direction = 'prev' | 'next';
type ButtonState = Record<Direction, boolean>;

const DEFAULT_BUTTON_STATE: ButtonState = {
  prev: true,
  next: true,
};

interface ListItemProps {
  id: string;
  description: string;
  imgUrl: string;
}

const generateListItem = ({ id, description, imgUrl }: ListItemProps) => {
  const $div = document.createElement('div');
  const $lazyImage = lazyImageBuilder({
    src: imgUrl,
    width: 250,
    height: 400,
  });
  const $span = document.createElement('span');
  $span.textContent = description;
  $div.append($lazyImage, $span);
  return $div;
};

const getVisibleEdgeItems = (
  $list: HTMLUListElement,
  $items: ItemElementType[]
) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect();
  const isVisible = ($item: ItemElementType) => {
    const { left, right } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    };
    return left <= lRight && right >= lLeft;
  };
  const leftIndex = Math.max($items.findIndex(isVisible), 0);
  const rightIndex = Math.min(
    $items.findLastIndex(isVisible),
    $items.length - 1
  );
  return { left: $items[leftIndex], right: $items[rightIndex] };
};

const vanillaScrollBox = () => {
  const setButtonEnabled = (state: ButtonState) => {
    $prevBtn.classList.toggle(cx('on'), state.prev);
    $nextBtn.classList.toggle(cx('on'), state.next);
  };

  const move = (direction: Direction) => {
    const { left, right } = getVisibleEdgeItems($list, $items);
    const $el: ItemElementType = direction === 'prev' ? left : right;
    $el?.scrollIntoView({
      behavior: 'smooth',
      inline: direction === 'prev' ? 'end' : 'start',
      block: 'nearest',
    });
  };

  const $list = document.createElement('ul');
  $list.classList.add(cx('list'));

  const $prevObserver = document.createElement('li');
  $prevObserver.classList.add(cx('observer'));
  $prevObserver.setAttribute('data-direction', 'prev');

  const $nextObserver = document.createElement('li');
  $nextObserver.classList.add(cx('observer'));
  $nextObserver.setAttribute('data-direction', 'next');

  const $items = data.map((item, i) => {
    const $item = document.createElement('li');
    $item.classList.add(cx('item'));
    $item.append(generateListItem(item));
    return $item;
  });

  $list.append($prevObserver, ...$items, $nextObserver);

  const $prevBtn = document.createElement('button');
  $prevBtn.classList.add(cx('nav-button'), cx('prev'));
  $prevBtn.addEventListener('click', () => move('prev'));

  const $nextBtn = document.createElement('button');
  $nextBtn.classList.add(cx('nav-button'), cx('next'));
  $nextBtn.addEventListener('click', () => move('next'));

  const $container = document.createElement('div');
  $container.classList.add(cx('scrollBox'));
  $container.append($list, $prevBtn, $nextBtn);

  vanillaIntersectionObserverV2(
    [$prevObserver, $nextObserver],
    {},
    (entries) => {
      if (!entries.length) setButtonEnabled(DEFAULT_BUTTON_STATE);
      const newState = { ...DEFAULT_BUTTON_STATE };
      entries.forEach((entry) => {
        const direction = (entry.target as HTMLElement).getAttribute(
          'data-direction'
        ) as Direction;
        newState[direction] = false;
      });
      setButtonEnabled(newState);
    }
  );

  return $container;
};

export default vanillaScrollBox;
