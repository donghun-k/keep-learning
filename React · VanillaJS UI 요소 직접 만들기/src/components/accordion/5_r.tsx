import { useState } from 'react';
import cx from './cx';
import data from './data';

interface AccordionItemProps {
  item: {
    id: string;
    title: string;
    description: string;
  };
  initialChecked: boolean;
}

const AccordionItem = ({ item, initialChecked }: AccordionItemProps) => {
  return (
    <li className={cx('item', 'item5')} key={item.id}>
      <input
        type="radio"
        name="accordion"
        id={item.id}
        className={cx('input')}
        defaultChecked={initialChecked}
      />
      <label htmlFor={item.id} className={cx('tab')}>
        {item.title}
      </label>
      <div className={cx('description')}>{item.description}</div>
    </li>
  );
};

const Accordion5 = () => {
  return (
    <>
      <h3>
        #5. React<sub>HTML input(radio)로 처리</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((item, i) => (
          <AccordionItem key={item.id} item={item} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
};

export default Accordion5;
