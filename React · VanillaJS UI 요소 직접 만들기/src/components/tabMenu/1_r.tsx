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

const TabItem = ({ item, current, toggle }: AccordionItemProps) => {
  return (
    <li onClick={toggle} className={cx('tab', { current })} key={item.id}>
      {item.title}
    </li>
  );
};

const TabMenu1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleCurrent = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  const currentData =
    data.find((item) => item.id === currentId)?.description ?? '';
  return (
    <>
      <h3>
        #1. React <sub>현재 항목만 렌더링</sub>
      </h3>
      <div className={cx('container')}>
        <ul className={cx('tabList')}>
          {data.map((item) => (
            <TabItem
              key={item.id}
              item={item}
              current={currentId === item.id}
              toggle={toggleCurrent(item.id)}
            />
          ))}
        </ul>
        <div className={cx('description')}>{currentData}</div>
      </div>
    </>
  );
};

export default TabMenu1;
