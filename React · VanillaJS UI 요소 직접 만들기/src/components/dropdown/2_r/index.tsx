import { KeyboardEvent, ReactNode, RefObject } from 'react';
import data from '../data';
import createDropdown, {
  DropdownItemProps,
  DropdownListProps,
  DropdownTriggerProps,
} from './Dropdown';
import cx from '../cx';

type DropdownItemType = {
  id: string;
  text: string;
};

const Dropdown = createDropdown<DropdownItemType>();

const DDTrigger = ({
  selectedItem,
  toggle,
}: DropdownTriggerProps<DropdownItemType>) => {
  return (
    <button
      className={cx('button-toggle')}
      onClick={() => {
        toggle();
      }}
    >
      <span className={cx('text')}>
        {selectedItem?.text || '항목을 선택하세요'}
      </span>
    </button>
  );
};

const DDItem = ({
  item,
  index,
  selectedIndex,
  focusedIndex,
  selectItem,
  itemsRef,
}: DropdownItemProps<DropdownItemType>) => {
  return (
    <li
      className={cx('item')}
      role="option"
      aria-selected={selectedIndex === index}
      aria-current={focusedIndex === index}
      ref={(r) => {
        if (itemsRef.current) itemsRef.current[index] = r as HTMLLIElement;
      }}
    >
      <button onClick={() => selectItem(index)}>{item.text}</button>
    </li>
  );
};

const DDList = ({ items, isOpen }: DropdownListProps<DropdownItemType>) => {
  if (!isOpen) return null;
  return (
    <ul className={cx('DropdownList')}>
      {items.map((item, i) => (
        <Dropdown.Item key={item.id} item={item} index={i}>
          {DDItem}
        </Dropdown.Item>
      ))}
    </ul>
  );
};

const DDContainer = ({
  handleKeyDown,
  children,
}: {
  handleKeyDown: (e: KeyboardEvent) => void;
  children: ReactNode;
}) => {
  return (
    <div className={cx('Dropdown')} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};

const Dropdown2 = () => {
  return (
    <article>
      <h3>
        #2. React<sub>Headless Component</sub>
      </h3>
      <Dropdown.Provider list={data}>
        <Dropdown.Container Component={DDContainer}>
          <Dropdown.Trigger>{DDTrigger}</Dropdown.Trigger>
          <Dropdown.List>{DDList}</Dropdown.List>
        </Dropdown.Container>
      </Dropdown.Provider>
    </article>
  );
};

export default Dropdown2;
