import cx from './cx';
import ScrollBox1 from './react';
import ScrollBox2 from './vanilla';

const ScrollBoxes = () => {
  return (
    <div className={cx('ScrollBoxPage')} style={{ marginBottom: 100 }}>
      <h2>Scroll Box</h2>
      <ScrollBox1 />
      <ScrollBox2 />
    </div>
  );
};

export default ScrollBoxes;
