import { useCallback, useEffect, useRef, useState } from 'react';
import { LazyImage } from '../../lazyLoading/1_r';
import cx from '../cx';
import data from '../data';
import useIntersectionObserver from '@/hook/useIntersectionObserverV2';

type Direction = 'prev' | 'next';
type ItemElementType = HTMLLIElement | null;

const getVisibleEdgeItems = (
  $list: HTMLUListElement,
  $items: ItemElementType[]
) => {
  const { left: lLeft, right: lRight } = $list.getBoundingClientRect();
  const isVisible = ($item: ItemElementType) => {
    const { left, right } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    };
    return left <= lRight && right >= lLeft;
  };
  const leftIndex = Math.max($items.findIndex(isVisible), 0);
  const rightIndex = Math.min(
    $items.findLastIndex(isVisible),
    $items.length - 1
  );
  return { left: $items[leftIndex], right: $items[rightIndex] };
};

const DEFAULT_BUTTON_ENABLED = { prev: true, next: true };

interface Props<T extends { id: string }> {
  data: T[];
  Item: (props: T & { handleClick?: () => void }) => JSX.Element;
  iniitialIndex?: number;
  currentIndex?: number;
  wrapperClassName?: string;
  handleItemClick?: (item: T, index: number) => () => void;
}

const ScrollBox = <T extends { id: string }>({
  data,
  Item,
  iniitialIndex = 0,
  currentIndex = 0,
  wrapperClassName = '',
  handleItemClick,
}: Props<T>) => {
  const [buttonEnabled, setButtonEnabled] = useState<{
    prev: boolean;
    next: boolean;
  }>(DEFAULT_BUTTON_ENABLED);

  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<ItemElementType[]>([]);
  const watcherRef = useRef<ItemElementType[]>([]);
  const { entries } = useIntersectionObserver(watcherRef);

  useEffect(() => {
    if (!entries.length) setButtonEnabled(DEFAULT_BUTTON_ENABLED);
    setButtonEnabled((prev) => {
      const newState = { ...DEFAULT_BUTTON_ENABLED };
      entries.forEach((entry) => {
        const direction = (entry.target as HTMLElement).dataset
          .direction as Direction;
        newState[direction] = false;
      });
      return newState;
    });
  }, [entries]);

  const move = useCallback((direction: Direction) => {
    if (!listRef.current || !itemsRef.current.length) return;
    const { left, right } = getVisibleEdgeItems(
      listRef.current,
      itemsRef.current
    );
    const $el: ItemElementType = direction === 'prev' ? left : right;
    $el?.scrollIntoView({
      behavior: 'smooth',
      inline: direction === 'prev' ? 'end' : 'start',
      block: 'nearest',
    });
  }, []);

  const handlePrevButtonClick = useCallback(() => {
    move('prev');
  }, [move]);
  const handleNextButtonClick = useCallback(() => {
    move('next');
  }, [move]);

  return (
    <div className={cx('scrollBox', wrapperClassName)}>
      <ul ref={listRef} className={cx('list')}>
        <li
          ref={(r) => {
            watcherRef.current[0] = r;
          }}
          className={cx('observer')}
          data-direction="prev"
        />
        {data.map((item, i) => (
          <li
            ref={(r) => {
              itemsRef.current[i] = r;
            }}
            className={cx('item', { current: currentIndex === i })}
            key={i}
          >
            <Item {...item} key={i} handleClick={handleItemClick?.(item, i)} />
          </li>
        ))}
        <li
          ref={(r) => {
            watcherRef.current[1] = r;
          }}
          className={cx('observer')}
          data-direction="next"
        />
      </ul>
      <button
        onClick={handlePrevButtonClick}
        className={cx('nav-button', 'prev', { on: buttonEnabled.prev })}
      />
      <button
        onClick={handleNextButtonClick}
        className={cx('nav-button', 'next', { on: buttonEnabled.next })}
      />
    </div>
  );
};

export default ScrollBox;
