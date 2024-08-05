import { Children, KeyboardEvent, ReactNode, RefObject, useRef } from 'react';
import data from '../data';

import cx from '../cx';
import useDropdown, {
  DropdownItemProps,
  DropdownListProps,
  DropdownTriggerProps,
} from './useDropdown';
import useStyleInView from '@/components/tooltip/useStyleInView';
import { createPortal } from 'react-dom';

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

const DROPDOWN_POSITION = {
  top: 5,
  bottom: 5,
  left: 0,
  right: 0,
};

const DDList = ({ children, containerRef, isOpen }: DropdownListProps) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const style = useStyleInView(
    containerRef as RefObject<HTMLElement>,
    listRef,
    DROPDOWN_POSITION,
    'absolute',
    true
  );
  const $root = document.querySelector('#popoverRoot');
  if (!$root) return null;

  if (!isOpen) return null;
  return createPortal(
    <ul className={cx('DropdownList')} ref={listRef} style={style}>
      {children}
    </ul>,
    $root
  );
};

const DDContainer = ({
  handleKeyDown,
  children,
  containerRef,
}: {
  handleKeyDown: (e: KeyboardEvent) => void;
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className={cx('Dropdown')}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

const Dropdown4 = () => {
  const { getContainerProps, getTriggerProps, getListProps, getItemProps } =
    useDropdown(data);

  return (
    <article>
      <h3>
        #4. React<sub>Headless Component - Popover</sub>
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

export default Dropdown4;
