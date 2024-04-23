import { SyntheticEvent, useEffect, useState } from 'react';
import cx from './cx';
import data from './data';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const close = () => setIsOpen(false);
    console.log('isOpen', isOpen);
    if (isOpen) {
      window.addEventListener('click', close);
    }
    return () => {
      window.removeEventListener('click', close);
    };
  }, [isOpen]);

  return (
    <div className={cx('container')}>
      <button className={cx('trigger')} onClick={handleToggle}>
        {title}
      </button>
      {isOpen && (
        <div className={cx('tooltip')} onClick={(e) => e.stopPropagation()}>
          {description}
        </div>
      )}
    </div>
  );
};

const Tooltip1 = () => {
  return (
    <>
      <h3>#1. React</h3>
      {data.map((item) => (
        <Tooltip key={item.id} {...item} />
      ))}
    </>
  );
};

export default Tooltip1;
