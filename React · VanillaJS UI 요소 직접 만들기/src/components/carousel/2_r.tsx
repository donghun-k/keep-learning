import { useCallback, useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import Pagination from '../imageSlide/Pagination';

type Direction = 'left' | 'right';

export const Carousel = ({
  images,
  initialIndex = 0,
}: {
  images: string[];
  initialIndex?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const moveTo = useCallback(
    (nextIndex: number, direction?: Direction) => {
      if (currentIndex === nextIndex) return;
      const $current = itemsRef.current[currentIndex]!;
      const $next = itemsRef.current[nextIndex]!;
      const direct = direction || (nextIndex > currentIndex ? 'right' : 'left');
      const handleAnimationEnd = () => {
        $current.className = cx('item');
        $next.className = cx('item', 'current');
        setCurrentIndex(nextIndex);
        $current.removeEventListener('animationend', handleAnimationEnd);
      };
      $current.classList.add(cx(`${direct}_current`));
      $next.classList.add(cx(`${direct}_next`));
      $current.addEventListener('animationend', handleAnimationEnd, {
        once: true,
      });
    },
    [currentIndex]
  );

  const move = useCallback(
    (direction: Direction) => {
      const nextIndex =
        ((direction === 'right' ? currentIndex + 1 : currentIndex - 1) +
          images.length) %
        images.length;
      moveTo(nextIndex, direction);
    },
    [images, currentIndex, moveTo]
  );

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  return (
    <div className={cx('carousel', 'carousel1')}>
      <ul className={cx('container')}>
        {images.map((url, index) => (
          <li
            key={index}
            className={cx('item', { current: index === currentIndex })}
            ref={(r) => (itemsRef.current[index] = r)}
          >
            <img src={url} width="600" height="320" loading="lazy" />
            <span>#{index + 1}</span>
          </li>
        ))}
      </ul>
      <button
        className={cx('navButton', 'navLeft')}
        onClick={() => move('left')}
      />
      <button
        className={cx('navButton', 'navRight')}
        onClick={() => move('right')}
      />
      <Pagination
        currentIndex={currentIndex}
        totalPage={images.length}
        visibleCount={6}
        handleMove={moveTo}
      />
    </div>
  );
};

const Carousel2 = () => {
  return (
    <>
      <h3>#2. React</h3>
      <Carousel images={data} />
    </>
  );
};

export default Carousel2;
