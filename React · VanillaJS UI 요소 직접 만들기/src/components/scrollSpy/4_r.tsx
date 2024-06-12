import { useCallback, useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import useIntersectionObserver from '@/hook/useIntersectionObserverV2';
import ScrollBox, { ScrollBoxHandle } from '../scrollBox/react/ScrollBox';

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

interface NavItemProps {
  id: string;
  index: number;
  handleClick?: () => void;
}

const NavItem = ({ index, handleClick }: NavItemProps) => (
  <button onClick={handleClick}>{index + 1}</button>
);

const Scrollspy4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const scrollBoxRef = useRef<ScrollBoxHandle>(null);
  const { entries } = useIntersectionObserver(itemsRef, IO_OPTIONS);

  const setCurrentItem = useCallback((index: number) => {
    setCurrentIndex(index);
    scrollBoxRef.current?.focusCurrent(index);
  }, []);

  const handleNavClick = useCallback(
    (item: unknown, index: number) => () => {
      const scrollTop = document.scrollingElement?.scrollTop!;
      const itemY = itemsRef.current[index]?.getBoundingClientRect().top || 0;
      const top = scrollTop + itemY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    []
  );

  useEffect(() => {
    itemsRef.current = data.map((d, i) => document.getElementById(d.id));
  }, []);

  useEffect(() => {
    const $target = entries[0]?.target as HTMLElement;
    const index = $target?.dataset.index;

    if (typeof index === 'string') {
      setCurrentItem(parseInt(index, 10));
    }
  }, [entries]);

  return (
    <div className={cx('Scrollspy')}>
      <header className={cx('floatingHeader')}>
        <h2 className={cx('title')}>Scrollspy</h2>
        <h3 className={cx('subTitle')}>
          #4. React<sub>Intersection Observer + Scroll Box</sub>
        </h3>
        <ScrollBox
          ref={scrollBoxRef}
          data={data}
          Item={NavItem}
          currentIndex={currentIndex}
          wrapperClassName={cx('nav', 'with-scrollbox')}
          handleItemClick={handleNavClick}
        />
      </header>
      <ul>
        {data.map((item, i) => (
          <ListItem key={i} {...item} number={i + 1} />
        ))}
      </ul>
    </div>
  );
};

export default Scrollspy4;
