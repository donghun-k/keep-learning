import Carousel1 from './1_v';
import Carousel2 from './2_r';
import Carousel3 from './3_r';
import cx from './cx';

const Carousels = () => {
  return (
    <div className={cx('Carousels')}>
      <h2>Carousel</h2>
      <Carousel1 />
      <Carousel2 />
      <Carousel3 />
    </div>
  );
};

export default Carousels;
