import { useState } from 'react';
import cx from './cx';
import data from './data';

interface AccordionItemProps {
  item: {
    id: string;
    title: string;
    description: string;
  };
  current: boolean;
  toggle: () => void;
}

const AccordionItem = ({ item, current, toggle }: AccordionItemProps) => {
  return (
    <li
      onClick={toggle}
      className={cx('item', 'item2', { current })}
      key={item.id}
    >
      <div className={cx('tab')}>{item.title}</div>
      <div className={cx('description')}>{item.description}</div>
    </li>
  );
};

const Accordion2 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleCurrent = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #2. React<sub>CSS로 hidden/show 처리</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            current={currentId === item.id}
            toggle={toggleCurrent(item.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion2;
