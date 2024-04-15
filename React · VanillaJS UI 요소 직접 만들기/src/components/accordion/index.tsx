import Accordion1 from './Accordion1';
import Accordion2 from './Accordion2';
import cx from './cx';

const Accordions = () => {
  return (
    <div className={cx('Accordions')}>
      <Accordion1 />
      <Accordion2 />
    </div>
  );
};

export default Accordions;
