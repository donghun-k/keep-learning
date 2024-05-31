import { useEffect, useRef } from 'react';
import cx from '../cx';
import useInfiniteFetcher from './useInfiniteFetcher';
import useIntersectionObserver from '@/hook/useIntersectionObserver';
import useInfinteScroll from './useInfiniteScroll';

interface ListItemProps {
  id: string;
  number: number;
  title: string;
  description: string;
}

const ListItem = ({ number, title, description }: ListItemProps) => {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
};

const InfiniteScroll1 = () => {
  const { state, data, moreRef } = useInfinteScroll();
  return (
    <>
      <h2>Infinite Scroll</h2>
      <h3>#1. React</h3>
      <ul>
        {data.map((page, i) =>
          page.map((item, j) => (
            <ListItem key={item.id} number={i * 20 + j + 1} {...item} />
          ))
        )}
      </ul>
      <div ref={moreRef} />
      {state === 'loading' && <div className={cx('spinner')} />}
    </>
  );
};

export default InfiniteScroll1;
