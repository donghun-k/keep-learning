import { useState } from 'react';
import cx from './cx';
import data from './data';

interface TabItemProps {
  item: {
    id: string;
    title: string;
    description: string;
  };
  current: boolean;
  toggle: () => void;
}

const TabItem = ({ item, current, toggle }: TabItemProps) => {
  return (
    <li onClick={toggle} className={cx('item', { current })} key={item.id}>
      <div className={cx('tab')}>{item.title}</div>
      <div className={cx('description')}>{item.description}</div>
    </li>
  );
};

const TabMenu3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleCurrent = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #3. React<sub>한 li안에 title/desc 모두 있게 처리</sub>
      </h3>
      <ul className={cx('container', 'tabMenu3')}>
        {data.map((item) => (
          <TabItem
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

export default TabMenu3;
