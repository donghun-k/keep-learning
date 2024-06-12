import { useCallback, useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import ViewportContextProvider, {
  useViewportRect,
} from '@/context/viewportContext';

const HEADER_HEIGHT = 60;

interface ListItemProps {
  id: string;
  number: number;
  title: string;
  description: string;
}

type ItemInfo = {
  index: number;
  top: number;
  height: number;
  el: HTMLElement;
} | null;

const ListItem = ({ number, title, description, id }: ListItemProps) => {
  return (
    <li id={id} data-number={number}>
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

const Scrollspy1 = () => {
  return (
    <ViewportContextProvider>
      <Scrollspy />
    </ViewportContextProvider>
  );
};

const Scrollspy = () => {
  const { top: viewportTop, scrollHeight } = useViewportRect();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsRef = useRef<ItemInfo[]>([]);
  const navsRef = useRef<(HTMLLIElement | null)[]>([]);

  const setCurrentItem = useCallback(() => {
    const scrollTop = viewportTop * -1;
    const target = itemsRef.current.find(
      (item) =>
        item &&
        scrollTop >= item.top - HEADER_HEIGHT - item.height / 2 &&
        scrollTop < item.top - HEADER_HEIGHT + item.height / 2
    );
    if (target) {
      setCurrentIndex(target.index);
      navsRef.current[target.index]?.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: 'instant',
      });
    }
  }, [viewportTop]);

  const handleNavClick = useCallback((index: number) => {
    const itemY = (itemsRef.current[index]?.top || 0) - HEADER_HEIGHT;
    if (itemY >= 0) {
      window.scrollTo({
        top: itemY,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    const calculateItem = () => {
      const scrollTop = document.scrollingElement!.scrollTop;
      itemsRef.current = data.map((d, i) => {
        const $item = document.getElementById(d.id);
        if (!$item) return null;
        const { top, height } = $item.getBoundingClientRect();
        return { el: $item, index: i, top: top + scrollTop, height };
      });
    };
    calculateItem();

    const resizeObserver = new ResizeObserver(calculateItem);
    resizeObserver.observe(document.scrollingElement!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setCurrentItem();
  }, [setCurrentItem, viewportTop]);

  return (
    <div className={cx('Scrollspy')}>
      <header className={cx('floatingHeader')}>
        <h2 className={cx('title')}>Scrollspy</h2>
        <h3 className={cx('subTitle')}>
          #1. React<sub>Scroll Event</sub>
        </h3>
        <ul className={cx('nav')}>
          {data.map((item, i) => (
            <li
              key={i}
              className={cx('navItem', { current: currentIndex === i })}
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

export default Scrollspy1;
