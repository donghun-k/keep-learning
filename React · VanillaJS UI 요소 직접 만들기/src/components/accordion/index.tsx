import Accordion1 from './1_r';
import Accordion2 from './2_r';
import Accordion3 from './3_r';
import Accordion4 from './4_v';
import Accordion5 from './5_r';
import cx from './cx';

const Accordions = () => {
  return (
    <div className={cx('Accordions')}>
      <Accordion1 />
      <Accordion2 />
      <Accordion3 />
      <Accordion4 />
      <Accordion5 />
    </div>
  );
};

export default Accordions;
