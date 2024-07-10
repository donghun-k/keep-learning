import classNames from 'classnames/bind';
import styles from './pagination.module.scss';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

interface Props {
  totalPage: number;
  currentIndex: number;
  visibleCount: number;
  handleMove: (index: number) => void;
}

const Pagination = ({
  totalPage,
  currentIndex,
  visibleCount,
  handleMove,
}: Props) => {
  const indexes = useMemo(
    () => Array.from({ length: totalPage }, (_, i) => i),
    [totalPage]
  );

  const viewCount = Math.min(visibleCount || totalPage, totalPage);
  const halfCount = Math.floor(viewCount / 2);
  const visibleMin = Math.min(
    Math.max(0, currentIndex - halfCount),
    totalPage - viewCount
  );

  const visiblePages = indexes.slice(visibleMin, visibleMin + viewCount);

  return (
    <div className={cx('Pagination')}>
      <ul className={cx('pageList')}>
        {visiblePages.map((pageIndex, i) => (
          <li
            key={pageIndex}
            className={cx('page', {
              current: currentIndex === pageIndex,
            })}
          >
            <button onClick={() => handleMove(pageIndex)}>
              {pageIndex + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
