import { useCallback, useRef, useState } from 'react';
import { LazyImage } from '../lazyLoading/1_r';
import cx from './cx';
import data from './data';

type Direction = 'left' | 'right';

const ImageSlide2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const move = useCallback((direction: Direction) => {
    if (animatingRef.current) return;
    setCurrentIndex((prevIndex) => {
      const next =
        ((direction === 'right' ? prevIndex + 1 : prevIndex - 1) +
          data.length) %
        data.length;
      animatingRef.current = true;
      return next;
    });
  }, []);

  const handleTransitionEnd = () => {
    animatingRef.current = false;
  };

  return (
    <>
      <h3>#2. React</h3>
      <div className={cx('imageSlide', 'imageSlide2')} ref={wrapperRef}>
        <ul
          className={cx('container')}
          style={{
            left: currentIndex * -600 + 'px',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
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

export default ImageSlide2;
