import { useCallback, useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import useIntersectionObserver from '@/hook/useIntersectionObserverV2';

const HEADER_HEIGHT = 60;

const IO_OPTIONS: IntersectionObserverInit = {
  rootMargin: `-${HEADER_HEIGHT}px 0% 0% 0%`,
  threshold: 0.5,
};

interface ListItemProps {
  id: string;
  number: number;
  title: string;
  description: string;
}

const ListItem = ({ number, title, description, id }: ListItemProps) => {
  return (
    <li id={id} data-index={number - 1}>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>
        {description.split('\r\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </li>
  );
};

const ScrollSpy2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const navsRef = useRef<(HTMLLIElement | null)[]>([]);
  const { entries } = useIntersectionObserver(itemsRef, IO_OPTIONS);

  const setCurrentItem = useCallback((index: number) => {
    setCurrentIndex(index);
    navsRef.current[index]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'instant',
    });
  }, []);

  const handleNavClick = useCallback((index: number) => {
    const scrollTop = document.scrollingElement?.scrollTop!;
    const itemY = itemsRef.current[index]?.getBoundingClientRect().top || 0;
    const top = scrollTop + itemY - HEADER_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    itemsRef.current = data.map((d, i) => document.getElementById(d.id));
  }, []);

  useEffect(() => {
    const entryTops = entries.map((e) => e.boundingClientRect.top);
    const topMin = Math.min(...entryTops);
    const $target = entries.find((e) => e.boundingClientRect.top === topMin)
      ?.target as HTMLElement;
    const index = $target?.dataset.index;

    if (typeof index === 'string') {
      setCurrentItem(parseInt(index, 10));
    }
  }, [entries]);

  return (
    <div className={cx('ScrollSpy')}>
      <header className={cx('floatingHeader')}>
        <h2 className={cx('title')}>Scrollspy</h2>
        <h3 className={cx('subTitle')}>
          #2. React<sub>Intersection Observer</sub>
        </h3>
        <ul className={cx('nav')}>
          {data.map((item, i) => (
            <li
              key={i}
              className={cx('navItem', {
                current: currentIndex === i,
              })}
              ref={(r) => (navsRef.current[i] = r)}
            >
              <button onClick={() => handleNavClick(i)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </header>
      <ul>
        {data.map((item, i) => (
          <ListItem key={i} {...item} number={i + 1} />
        ))}
      </ul>
    </div>
  );
};

export default ScrollSpy2;
