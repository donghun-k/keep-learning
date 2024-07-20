import cx from '../cx';
import data from '../data';
import { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { LazyImageProps } from '@/components/lazyLoading/1_r/LazyImage';
const LazyImage = dynamic<LazyImageProps>(
  () => import('@/components/lazyLoading/1_r/LazyImage'),
  {
    ssr: false,
  }
);

export interface Image {
  id: string;
  thumbnail: string;
  fullsize: string;
}
type TotalImageItemProps = Image & { handleClick?: () => void };
interface Review {
  id: string;
  number: number;
  name: string;
  text: string;
  images?: Image[];
}

const TotalImageItem = ({ thumbnail }: TotalImageItemProps) => {
  return <LazyImage src={thumbnail} width={150} height={80} />;
};

const ReviewItem = ({ id, number, name, text, images = [] }: Review) => {
  const imageLength = images.length;
  return (
    <li className={cx('review-item')}>
      {imageLength > 0 && (
        <div className={cx('review-item__image')}>
          <LazyImage src={images[0].thumbnail} width={150} height={80} />
          {imageLength > 1 && (
            <span className={cx('review-item__image-more')}>
              + {imageLength - 1}
            </span>
          )}
        </div>
      )}
      <div className={cx('review-item__user')}>{name}</div>
      <div className={cx('review-item__text')}>{text}</div>
    </li>
  );
};

const totalImages: Image[] = data.flatMap((d) => d.images || []);

const Reviews = () => {
  const list = useMemo(() => totalImages.slice(0, 10), []);

  return (
    <div className={cx('Reviews')}>
      <h3>사용자 리뷰</h3>
      <article>
        <h4>사진 모아보기</h4>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: 0,
            padding: 0,
            overflowX: 'auto',
          }}
        >
          {list.map((item) => (
            <li key={item.id}>
              <TotalImageItem {...item} />
            </li>
          ))}
        </ul>
      </article>
      <article>
        <h4>리뷰</h4>
        <ul className={cx('review-list')}>
          {data.map((item) => (
            <ReviewItem {...item} key={item.id} />
          ))}
        </ul>
      </article>
    </div>
  );
};

export default Reviews;
