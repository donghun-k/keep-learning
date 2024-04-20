import TabMenu1 from './1_r';
import TabMenu2 from './2_r';
import cx from './cx';

const TabMenus = () => {
  return (
    <div className={cx('TabMenus')}>
      <TabMenu1 />
      <TabMenu2 />
    </div>
  );
};

export default TabMenus;
