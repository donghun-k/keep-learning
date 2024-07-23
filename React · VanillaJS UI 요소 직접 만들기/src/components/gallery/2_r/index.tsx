import Reviews, { Image } from '../1_r/reviews';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import cx from '../cx';
import LazyImage from '@/components/lazyLoading/1_r/LazyImage';
import ScrollBox, {
  ScrollBoxHandle,
} from '@/components/scrollBox/react/ScrollBox';
import useModal from '@/components/modal/4_r/useModal';
import Modal from '@/components/modal/4_r/Modal';

export type GalleryProps = {
  galleryKey: string;
  images: Image[];
  initialIndex: number;
};
export type SetGalleryData = Dispatch<SetStateAction<GalleryProps>>;
type Zoom = 'scaleUp' | 'scaleDown';
const initialGalleryProps: GalleryProps = {
  galleryKey: '',
  images: [],
  initialIndex: 0,
};

const GalleryThumbnail = ({
  thumbnail,
  handleClick,
}: Image & { handleClick?: () => void }) => {
  return (
    <div className={cx('thumbnail')} onClick={handleClick}>
      <LazyImage src={thumbnail} width={150} height={80} />
    </div>
  );
};

const GalleryModal = ({
  images,
  initialIndex = 0,
  setGalleryData,
}: {
  images: Image[];
  initialIndex: number;
  setGalleryData: SetGalleryData;
}) => {
  const { modalRef, openModal, closeModal } = useModal();
  const scrollboxRef = useRef<ScrollBoxHandle>();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  const onClose = () => {
    setGalleryData(initialGalleryProps);
    closeModal();
  };

  const handleItemClick = (item: unknown, index: number) => () => {
    setCurrentIndex(index);
    setZoom(1);
    scrollboxRef.current!.focusCurrent(index, 'smooth');
  };
  const handleZoom = (zoom: Zoom) => {
    setZoom((prev) =>
      Math.min(Math.max(prev + (zoom === 'scaleUp' ? 1 : -1) * 0.25, 0.5), 2)
    );
  };
  const resetZoom = () => setZoom(1);

  useEffect(() => {
    if (images.length) openModal();
  }, [images]);

  const fullSizeImageUrl = images[currentIndex]?.fullsize || '';

  return (
    <Modal
      className={cx('GalleryModal')}
      modalRef={modalRef}
      close={onClose}
      closeOnClickOutside
    >
      <Modal.Header close={onClose} />
      <Modal.Content className={cx('GalleryModalContent')}>
        <div className={cx('Gallery')}>
          <div className={cx('main-view')}>
            <LazyImage
              src={fullSizeImageUrl}
              width={600}
              height={320}
              key={fullSizeImageUrl}
              style={{ transform: `scale(${zoom})` }}
            />
            <div className={cx('zoom-buttons')}>
              <button
                className={cx('zoom-down')}
                onClick={() => handleZoom('scaleDown')}
              >
                -
              </button>
              <button className={cx('current-zoom')} onClick={resetZoom}>
                {Math.round(zoom * 100)}%
              </button>
              <button
                className={cx('zoom-up')}
                onClick={() => handleZoom('scaleUp')}
              >
                +
              </button>
            </div>
          </div>
          <ScrollBox
            wrapperClassName={cx('thumbnails')}
            data={images}
            Item={GalleryThumbnail}
            handleItemClick={handleItemClick}
            currentIndex={currentIndex}
            ref={scrollboxRef}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
};

const Gallery2 = () => {
  const [galleryData, setGalleryData] =
    useState<GalleryProps>(initialGalleryProps);
  return (
    <>
      <h2>Gallery #2 - Viewer</h2>
      <Reviews setGalleryData={setGalleryData} />
      <GalleryModal
        key={galleryData.galleryKey}
        {...galleryData}
        setGalleryData={setGalleryData}
      />
    </>
  );
};

export default Gallery2;
