import ImageSlide1 from './1_v';
import cx from './cx';

const ImageSlides = () => {
  return (
    <div className={cx('ImageSlides')}>
      <h2>이미지 슬라이드</h2>
      <ImageSlide1 />
    </div>
  );
};

export default ImageSlides;
