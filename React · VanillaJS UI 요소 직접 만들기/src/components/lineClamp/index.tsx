import LineClamp1 from './1_r';
import LineClamp2 from './2_r';
import LineClamp3 from './3_v';
import cx from './cx';

const LineClamps = () => (
  <div className={cx('LineClamps')}>
    <h2>여러줄 말줄임</h2>
    <LineClamp1 />
    <LineClamp2 />
    <LineClamp3 />
  </div>
);

export default LineClamps;
