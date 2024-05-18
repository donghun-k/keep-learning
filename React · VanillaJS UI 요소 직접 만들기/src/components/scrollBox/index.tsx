import cx from './cx';
import ScrollBox1 from './react';

const ScrollBoxes = () => {
  return (
    <div className={cx('ScrollBoxPage')} style={{ marginBottom: 100 }}>
      <h2>횡 스크롤 박스</h2>
      <ScrollBox1 />
    </div>
  );
};

export default ScrollBoxes;
