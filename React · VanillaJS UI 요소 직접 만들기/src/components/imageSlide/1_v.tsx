import { generateDOM } from '@/service/util';
import cx from './cx';
import data from './data';
import { lazyImageBuilder } from '../lazyLoading/2_v';
import VanillaWrapper from '../vanillaWrapper';

type Direction = 'left' | 'right';

const initiator = (wrapper: HTMLDivElement) => {
  let currentIndex = 0;
  wrapper.classList.add(cx('imageSlide'));

  const $ul = generateDOM('ul', cx('container'));
  const $items = data.map((url, index) => {
    const $li = generateDOM('li', cx('item'));
    const $img = lazyImageBuilder({
      src: url,
      width: 600,
      height: 320,
    });
    $li.append($img, generateDOM('span', undefined, `#${index + 1}`));
    return $li;
  });

  $ul.append(...$items);

  const move = (direction: Direction) => {
    // const next =
    //   direction === 'right'
    //     ? Math.min(currentIndex + 1, data.length - 1)
    //     : Math.max(currentIndex - 1, 0);
    const next =
      ((direction === 'right' ? currentIndex + 1 : currentIndex - 1) +
        data.length) %
      data.length;

    $ul.style.left = -1 * next * 600 + 'px';
    currentIndex = next;
  };

  const $prev = generateDOM('button', cx('navButton', 'navLeft'));
  $prev.addEventListener('click', () => move('left'));

  const $next = generateDOM('button', cx('navButton', 'navRight'));
  $next.addEventListener('click', () => move('right'));

  wrapper.classList.add(cx('imageSlide'));
  wrapper.classList.add(cx('imageSlide1'));
  wrapper.append($ul, $prev, $next);
};

const ImageSlide1 = () => {
  return (
    <VanillaWrapper title="#1" subTitle="ul 좌표 이동" initiator={initiator} />
  );
};

export default ImageSlide1;
