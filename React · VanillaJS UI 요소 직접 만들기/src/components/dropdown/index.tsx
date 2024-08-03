import Dropdown1 from './1_r';
import Dropdown2 from './2_r';
import Dropdown3 from './3_r';
import cx from './cx';

const Dropdowns = () => {
  return (
    <div className={cx('Dropdowns')}>
      <Dropdown1 />
      <Dropdown2 />
      <Dropdown3 />
    </div>
  );
};

export default Dropdowns;
