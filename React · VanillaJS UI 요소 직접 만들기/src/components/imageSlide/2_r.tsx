import { useCallback, useRef, useState } from 'react';
import { LazyImage } from '../lazyLoading/1_r';
import cx from './cx';
import data from './data';

type Direction = 'left' | 'right';

const ImageSlide2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const move = useCallback((direction: Direction) => {
    setCurrentIndex(
      (prevIndex) =>
        ((direction === 'right' ? prevIndex + 1 : prevIndex - 1) +
          data.length) %
        data.length
    );
  }, []);
  return (
    <>
      <h3>#2. React</h3>
      <div className={cx('imageSlide')} ref={wrapperRef}>
        <ul
          className={cx('container')}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
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
