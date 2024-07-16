import cx from '../cx'
import data from '../data'
import { useMemo, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ScrollBox from '@/components/part1/scrollBox'
import { SetGalleryData } from '.'
const LazyImage = dynamic(() => import('@/components/part1/lazyImage'), { ssr: false })

export type Image = { id: string; thumbnail: string; fullsize: string }
type TotalImageItemProps = Image & { handleClick?: () => void }
type Review = {
  id: string
  number: number
  name: string
  text: string
  images?: Image[]
  setGalleryData: SetGalleryData
}

const TotalImageItem = ({ handleClick, ...image }: TotalImageItemProps) => (
  <LazyImage src={image?.thumbnail} width={150} height={80} onClick={handleClick} />
)

const ReviewItem = ({ id, number, name, text, images = [], setGalleryData }: Review) => {
  const imageLength = images.length

  const openGallery = useCallback(() => {
    setGalleryData({
      galleryKey: id,
      images,
      initialIndex: 0,
    })
  }, [id, images, setGalleryData])

  return (
    <li className={cx('review-item')}>
      {imageLength > 0 && (
        <div className={cx('review-item__image')}>
          <LazyImage src={images[0].thumbnail} width={150} height={80} onClick={openGallery} />
          {imageLength > 1 && (
            <span className={cx('review-item__image-more')}>+ {imageLength - 1}</span>
          )}
        </div>
      )}
      <div className={cx('review-item__user')}>{name}</div>
      <div className={cx('review-item__text')}>{text}</div>
    </li>
  )
}

const totalImages: Image[] = data.flatMap(d => d.images || [])

const Reviews = ({ setGalleryData }: { setGalleryData: SetGalleryData }) => {
  const scrollBoxRef = useRef()
  const list = useMemo(() => totalImages.slice(0, 10), [])

  const handleTotalItemClick = useCallback(
    (_: unknown, i: number) => () => {
      setGalleryData({ galleryKey: 'total', images: totalImages, initialIndex: i })
    },
    [setGalleryData],
  )

  return (
    <div className={cx('Reviews')}>
      <h3>사용자 리뷰</h3>
      <article>
        <h4>사진 모아보기</h4>
        <ScrollBox
          list={list}
          Item={TotalImageItem}
          ref={scrollBoxRef}
          handleItemClick={handleTotalItemClick}
        />
      </article>

      <article>
        <h4>리뷰</h4>
        <ul className={cx('review-list')}>
          {data.map(item => (
            <ReviewItem {...item} key={item.id} setGalleryData={setGalleryData} />
          ))}
        </ul>
      </article>
    </div>
  )
}

export default Reviews
