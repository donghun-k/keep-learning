import ImageSlide1 from './1_v';
import ImageSlide2 from './2_r';
import ImageSlide3 from './3_r';
import cx from './cx';

const ImageSlides = () => {
  return (
    <div className={cx('ImageSlides')}>
      <h2>이미지 슬라이드</h2>
      <ImageSlide1 />
      <ImageSlide2 />
      <ImageSlide3 />
    </div>
  );
};

export default ImageSlides;
