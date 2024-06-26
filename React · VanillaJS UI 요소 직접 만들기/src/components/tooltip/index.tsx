import cx from './cx';
import Tooltip1 from './1_r';
import Tooltip2 from './2_r';
import Tooltip3 from './3_r';
import Tooltip4 from './4_r';
import Tooltip5 from './5_v';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')}>
      <h2>Tooltip</h2>
      <Tooltip1 />
      <Tooltip2 />
      <Tooltip3 />
      <Tooltip4 />
      <Tooltip5 />
    </div>
  );
};

export default Tooltips;
