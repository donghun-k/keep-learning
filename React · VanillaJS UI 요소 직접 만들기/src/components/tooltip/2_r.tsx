import { SyntheticEvent, useEffect } from 'react';
import cx from './cx';
import data from './data';
import SingleOpenContextProvider, {
  useSingleOpen,
} from '@/context/singleOpenContext';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const [isOpen, toggle] = useSingleOpen(id);

  const handleToggle = (e: SyntheticEvent) => {
    e.stopPropagation();
    toggle((p) => (p === id ? null : id));
  };

  useEffect(() => {
    const close = () => toggle(null);
    if (isOpen) {
      window.addEventListener('click', close, { once: true });
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

const Tooltip2 = () => {
  return (
    <>
      <h3>
        #2. React<sub>Context를 이용해 하나만 열리도록 처리</sub>
      </h3>
      <SingleOpenContextProvider>
        {data.map((item) => (
          <Tooltip key={item.id} {...item} />
        ))}
      </SingleOpenContextProvider>
    </>
  );
};

export default Tooltip2;
