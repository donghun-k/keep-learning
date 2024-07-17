import ImageSlide1 from './1_v';
import ImageSlide2 from './2_r';
import ImageSlide3 from './3_r';
import ImageSlide4 from './4_r';
import cx from './cx';

const ImageSlides = () => {
  return (
    <div className={cx('ImageSlides')}>
      <h2>Image Slide</h2>
      <ImageSlide1 />
      <ImageSlide2 />
      <ImageSlide3 />
      <ImageSlide4 />
    </div>
  );
};

export default ImageSlides;
