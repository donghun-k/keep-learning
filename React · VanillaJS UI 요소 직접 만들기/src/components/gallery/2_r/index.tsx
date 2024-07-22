import useModal from '@/components/modal/4_r/useModal';
import Reviews, { type Image } from './reviews';
import Modal from '@/components/modal/4_r/Modal';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import cx from '../cx';
import LazyImage from '@/components/lazyLoading/1_r/LazyImage';
import ScrollBox, {
  ScrollBoxHandle,
} from '@/components/scrollBox/react/ScrollBox';

const initialGalleryProps = { galleryKey: '', images: [], initialIndex: 0 };

export type GalleryProps = {
  galleryKey: string;
  images: Image[];
  initialIndex: number;
};
export type SetGalleryData = Dispatch<SetStateAction<GalleryProps>>;

const GalleryThumbnail = ({
  thumbnail,
  handleClick,
}: {
  thumbnail: string;
  handleClick?: () => void;
}) => {
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
  const scrollBoxRef = useRef<ScrollBoxHandle>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const fullSizeImage = images[currentIndex]?.fullsize || '';

  const onClose = () => {
    setGalleryData(initialGalleryProps);
  };

  const handleItemClick = (item: unknown, index: number) => () => {
    setCurrentIndex(index);
    scrollBoxRef.current?.focusCurrent(index, 'smooth');
  };

  useEffect(() => {
    if (images.length) openModal();
  }, [images]);

  return (
    <Modal
      className={cx('GalleryModal')}
      modalRef={modalRef}
      close={closeModal}
      onClose={onClose}
      closeOnClickOutside
    >
      <Modal.Header close={closeModal} />
      <Modal.Content className={cx('GalleryModalContent')}>
        <div className={cx('Gallery')}>
          <div className={cx('main-view')}>
            <LazyImage src={fullSizeImage} width={600} height={320} />
          </div>
        </div>
        <ScrollBox
          wrapperClassName={cx('thumbnails')}
          data={images}
          Item={GalleryThumbnail}
          handleItemClick={handleItemClick}
          currentIndex={currentIndex}
          ref={scrollBoxRef}
        />
      </Modal.Content>
    </Modal>
  );
};

const Gallery2 = () => {
  const [galleryData, setGalleryData] =
    useState<GalleryProps>(initialGalleryProps);
  return (
    <>
      <h2>Gallery</h2>
      <h3>
        #2. React<sub>Viewer</sub>
      </h3>
      <Reviews setGalleryData={setGalleryData} />
      <GalleryModal
        images={galleryData?.images || []}
        initialIndex={galleryData?.initialIndex || 0}
        setGalleryData={setGalleryData}
      />
    </>
  );
};

export default Gallery2;
