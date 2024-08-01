import {
  createContext,
  Dispatch,
  KeyboardEvent,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from '../cx';

type DropdownItemType = {
  id: string;
  text: string;
};

type DropdownProps = {
  items: DropdownItemType[];
  isOpen: boolean;
  selectedIndex: number;
  focusedIndex: number;
  itemsRef: RefObject<HTMLLIElement[]>;
};

type DropdownDispatchProps = {
  setItems: Dispatch<SetStateAction<DropdownItemType[]>>;
  toggle: (force?: boolean) => void;
  selectItem: Dispatch<SetStateAction<number>>;
  focusItem: Dispatch<SetStateAction<number>>;
  handleKeyDown: (e: KeyboardEvent<Element>) => void;
};

type KeyEventHandler = (
  e: KeyboardEvent,
  props: Pick<DropdownProps, 'focusedIndex' | 'items'> &
    Pick<DropdownDispatchProps, 'focusItem' | 'selectItem' | 'toggle'>
) => void;

const KEY_EVENT_MAP: Partial<
  Record<KeyboardEvent<Element>['key'], KeyEventHandler>
> = {
  ArrowUp: (e, { focusItem }) => {
    e.preventDefault();
    focusItem((prev) => Math.max(prev - 1, 0));
  },
  ArrowDown: (e, { focusItem, items }) => {
    e.preventDefault();
    focusItem((prev) => Math.min(prev + 1, items.length - 1));
  },
  Enter: (e, { selectItem, focusedIndex }) => {
    e.preventDefault();
    selectItem(focusedIndex);
  },
  Escape: (e, { toggle }) => {
    toggle(false);
  },
};

const DropdownContext = createContext<DropdownProps>({
  items: [],
  isOpen: false,
  selectedIndex: -1,
  focusedIndex: -1,
  itemsRef: { current: [] },
});

const DropdownDispatchContext = createContext<DropdownDispatchProps>({
  setItems: () => {},
  toggle: () => {},
  selectItem: () => {},
  focusItem: () => {},
  handleKeyDown: () => {},
});

const useDropdown = () => useContext(DropdownContext);
const useSetDropdown = () => useContext(DropdownDispatchContext);

const DropdownContextProvider = ({
  list,
  children,
}: { list: DropdownItemType[] } & PropsWithChildren) => {
  const [items, setItems] = useState<DropdownItemType[]>(list);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  const toggle = (force?: boolean) => {
    setIsOpen((prev) => (typeof force === 'boolean' ? force : !prev));
  };

  const handleKeyDown = (e: KeyboardEvent<Element>) => {
    const { key } = e;
    const handler = KEY_EVENT_MAP[key];
    if (handler) {
      handler(e, {
        items,
        focusedIndex,
        focusItem: setFocusedIndex,
        selectItem: setSelectedIndex,
        toggle,
      });
    }
  };

  useEffect(() => {
    const targetElem = itemsRef.current?.[focusedIndex];
    if (targetElem)
      targetElem.scrollIntoView({
        block: 'nearest',
      });
  }, [focusedIndex]);

  useEffect(() => {
    const closeDropdown = () => toggle(false);
    if (isOpen) {
      window.addEventListener('click', closeDropdown, { once: true });
    }
    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        items,
        isOpen,
        selectedIndex,
        focusedIndex,
        itemsRef,
      }}
    >
      <DropdownDispatchContext.Provider
        value={{
          setItems,
          toggle,
          selectItem: setSelectedIndex,
          focusItem: setFocusedIndex,
          handleKeyDown,
        }}
      >
        {children}
      </DropdownDispatchContext.Provider>
    </DropdownContext.Provider>
  );
};

const DropdownContainer = ({ children }: PropsWithChildren) => {
  const { handleKeyDown } = useSetDropdown();
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

const DropdownTrigger = () => {
  const { selectedIndex, items } = useDropdown();
  const { toggle } = useSetDropdown();
  const selectedItem = items[selectedIndex];

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

const DropdownItem = ({
  item,
  index,
}: {
  item: DropdownItemType;
  index: number;
}) => {
  const { selectedIndex, focusedIndex, itemsRef } = useDropdown();
  const { selectItem } = useSetDropdown();

  return (
    <li
      className={cx('item')}
      role="option"
      aria-selected={selectedIndex === index}
      aria-current={focusedIndex === index}
      ref={(r) => {
        if (itemsRef.current) itemsRef.current[index] = r!;
      }}
    >
      <button onClick={() => selectItem(index)}>{item.text}</button>
    </li>
  );
};

const DropdownList = () => {
  const { items, isOpen } = useDropdown();
  if (!isOpen) return null;

  return (
    <ul className={cx('DropdownList')}>
      {items.map((item, i) => (
        <DropdownItem key={item.id} index={i} item={item} />
      ))}
    </ul>
  );
};

const Dropdown = {
  Provider: DropdownContextProvider,
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  List: DropdownList,
  Item: DropdownItem,
};

export default Dropdown;
