import useModal from '@/components/modal/4_r/useModal';
import Reviews, { type Image } from './reviews';
import Modal from '@/components/modal/4_r/Modal';
import { Carousel } from '@/components/carousel/2_r';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

const initialGalleryProps = { galleryKey: '', images: [], initialIndex: 0 };

export type GalleryProps = {
  galleryKey: string;
  images: Image[];
  initialIndex: number;
};
export type SetGalleryData = Dispatch<SetStateAction<GalleryProps>>;

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
  const fullImages = useMemo(
    () => images.map(({ fullsize }) => fullsize),
    [images]
  );

  const onClose = () => {
    setGalleryData(initialGalleryProps);
  };

  useEffect(() => {
    if (images.length) openModal();
  }, [images]);

  return (
    <Modal
      modalRef={modalRef}
      close={closeModal}
      onClose={onClose}
      closeOnClickOutside
    >
      <Modal.Content>
        <Carousel images={fullImages} initialIndex={initialIndex} />
      </Modal.Content>
    </Modal>
  );
};

const Gallery1 = () => {
  const [galleryData, setGalleryData] =
    useState<GalleryProps>(initialGalleryProps);
  return (
    <>
      <h2>Gallery</h2>
      <h3>#1. React</h3>
      <Reviews setGalleryData={setGalleryData} />
      <GalleryModal
        images={galleryData?.images || []}
        initialIndex={galleryData?.initialIndex || 0}
        setGalleryData={setGalleryData}
      />
    </>
  );
};

export default Gallery1;
