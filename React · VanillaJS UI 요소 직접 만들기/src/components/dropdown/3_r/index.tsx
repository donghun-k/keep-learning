import { Children, KeyboardEvent, ReactNode, RefObject } from 'react';
import data from '../data';

import cx from '../cx';
import useDropdown, {
  DropdownItemProps,
  DropdownListProps,
  DropdownTriggerProps,
} from './useDropdown';

type DropdownItemType = {
  id: string;
  text: string;
};

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

const DDList = ({ children, isOpen }: DropdownListProps) => {
  if (!isOpen) return null;
  return <ul className={cx('DropdownList')}>{children}</ul>;
};

const DDContainer = ({
  handleKeyDown,
  children,
}: {
  handleKeyDown: (e: KeyboardEvent) => void;
  children: ReactNode;
}) => {
  return (
    <div
      className={cx('Dropdown')}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

const Dropdown3 = () => {
  const { getContainerProps, getTriggerProps, getListProps, getItemProps } =
    useDropdown(data);

  return (
    <article>
      <h3>
        #3. React<sub>Headless Component - Only hook</sub>
      </h3>
      <DDContainer {...getContainerProps()}>
        <DDTrigger {...getTriggerProps()} />
        <DDList {...getListProps()}>
          {data.map((item, i) => (
            <DDItem key={item.id} {...getItemProps(i)}>
              {item.text}
            </DDItem>
          ))}
        </DDList>
      </DDContainer>
    </article>
  );
};

export default Dropdown3;
