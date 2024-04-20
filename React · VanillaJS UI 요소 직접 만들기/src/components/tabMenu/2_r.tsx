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

const TabMenu2 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleCurrent = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #2. React <sub>CSS로 hidden/show 처리</sub>
      </h3>
      <div className={cx('container', 'tabMenu2')}>
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
        {data.map((d) => (
          <div
            className={cx('description', {
              current: currentId === d.id,
            })}
          >
            {d.description}
          </div>
        ))}
      </div>
    </>
  );
};

export default TabMenu2;
