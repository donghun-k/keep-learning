import cx from './cx';
import Tooltip1 from './1_r';
import Tooltip2 from './2_r';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')}>
      <h2>툴팁</h2>
      <Tooltip1 />
      <Tooltip2 />
    </div>
  );
};

export default Tooltips;
