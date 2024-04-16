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
      className={cx('item', 'item3', { current })}
      key={item.id}
    >
      <div className={cx('tab')}>{item.title}</div>
      <div className={cx('description')}>{item.description}</div>
    </li>
  );
};

const Accordion3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleCurrent = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #3. React<sub>CSS Animation(transition)</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((item) => (
          <AccordionItem
            item={item}
            current={currentId === item.id}
            toggle={toggleCurrent(item.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion3;
