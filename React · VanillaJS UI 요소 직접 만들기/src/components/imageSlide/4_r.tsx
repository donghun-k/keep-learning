import { useCallback, useEffect, useRef, useState } from 'react';
import { LazyImage } from '../lazyLoading/1_r';
import cx from './cx';
import data from './data';
import Pagination from './Pagination';

type Direction = 'left' | 'right';

const ImageSlide4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);
  const scrollingRef = useRef(false);

  const moveTo = useCallback((index: number) => {
    if (scrollingRef.current) return;
    containerRef.current!.scrollTo({ left: index * 600, behavior: 'smooth' });
    setCurrentIndex(index);
    scrollingRef.current = true;
  }, []);
  const move = useCallback((direction: Direction) => {
    if (scrollingRef.current) return;
    setCurrentIndex((prevIndex) => {
      const next =
        ((direction === 'right' ? prevIndex + 1 : prevIndex - 1) +
          data.length) %
        data.length;

      containerRef.current!.scrollTo({ left: next * 600, behavior: 'smooth' });
      scrollingRef.current = true;
      return next;
    });
  }, []);

  useEffect(() => {
    const handleScrollEnd = () => {
      scrollingRef.current = false;
    };
    const $container = containerRef.current;
    if (!$container) return;

    $container.scrollLeft = 0;
    $container.addEventListener('scrollend', handleScrollEnd);

    return () => {
      $container.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  return (
    <>
      <h3>
        #4. React<sub>페이지네이션</sub>
      </h3>
      <div className={cx('imageSlide', 'imageSlide4')} ref={wrapperRef}>
        <ul className={cx('container')} ref={containerRef}>
          {data.map((url, index) => (
            <li key={index} className={cx('item')}>
              <LazyImage
                src={url}
                width={600}
                height={320}
                rootElRef={wrapperRef}
              />
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
          totalPage={data.length}
          currentIndex={currentIndex}
          visibleCount={6}
          handleMove={moveTo}
        />
      </div>
    </>
  );
};

export default ImageSlide4;
