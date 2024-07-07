import { useCallback, useEffect, useRef, useState } from 'react';
import { LazyImage } from '../lazyLoading/1_r';
import cx from './cx';
import data from './data';

type Direction = 'left' | 'right';

const ImageSlide3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  const move = useCallback((direction: Direction) => {
    setCurrentIndex((prevIndex) => {
      const next =
        ((direction === 'right' ? prevIndex + 1 : prevIndex - 1) +
          data.length) %
        data.length;

      containerRef.current!.scrollTo({ left: next * 600, behavior: 'smooth' });

      return next;
    });
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      left: 0,
    });
  }, []);

  return (
    <>
      <h3>#3. React</h3>
      <div className={cx('imageSlide', 'imageSlide3')} ref={wrapperRef}>
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
      </div>
    </>
  );
};

export default ImageSlide3;
