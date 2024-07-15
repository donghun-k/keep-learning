import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import cx from './cx';
import data from './data';

type Direction = 'left' | 'right';

const Carousel3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageCount, setImageCount] = useState(9);

  const { images, theta, radius } = useMemo(() => {
    const images = Array.from({ length: imageCount }, (_, i) => i + 1);
    const theta = 360 / imageCount;
    const radius = Math.round(150 / Math.tan(Math.PI / imageCount));
    return { images, theta, radius };
  }, [imageCount]);

  const move = useCallback(
    (direction: Direction) => {
      const nextIndex =
        direction === 'right' ? currentIndex + 1 : currentIndex - 1;
      setCurrentIndex(nextIndex);
    },
    [currentIndex]
  );

  const handleChangeCount = (e: SyntheticEvent) => [
    setImageCount(parseInt((e.target as HTMLInputElement).value, 10)),
    setCurrentIndex(0),
  ];

  return (
    <>
      <h3>
        #3. React<sub>3D</sub>
      </h3>
      <div className={cx('carousel', 'carousel2')}>
        <ul
          className={cx('container')}
          style={{
            transform: `translateZ(${-1 * radius}px) rotateY(${
              -1 * theta * currentIndex
            }deg)`,
          }}
        >
          {images.map((num, index) => (
            <li
              key={index}
              className={cx('item', { current: index === currentIndex })}
              style={{
                transform: `rotateY(${
                  theta * index
                }deg) translateZ(${radius}px)`,
              }}
            >
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
      <label>
        <input
          type="range"
          min={3}
          max={30}
          value={imageCount}
          onChange={handleChangeCount}
        />{' '}
        {imageCount}
      </label>
    </>
  );
};

export default Carousel3;
