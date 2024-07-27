import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
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
};

type DropdownDispatchProps = {
  setItems: Dispatch<SetStateAction<DropdownItemType[]>>;
  toggle: (force?: boolean) => void;
  selectItem: (index: number) => void;
  focusItem: (index: number) => void;
};

const DropdownContext = createContext<DropdownProps>({
  items: [],
  isOpen: false,
  selectedIndex: -1,
  focusedIndex: -1,
});

const DropdownDispatchContext = createContext<DropdownDispatchProps>({
  setItems: () => {},
  toggle: () => {},
  selectItem: () => {},
  focusItem: () => {},
});

const useDropdown = () => useContext(DropdownContext);
const useSetDropdown = () => useContext(DropdownDispatchContext);

const DropdownContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<DropdownItemType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const toggle = (force?: boolean) => {
    setIsOpen((prev) => (typeof force === 'boolean' ? force : !prev));
  };

  return (
    <DropdownContext.Provider
      value={{
        items,
        isOpen,
        selectedIndex,
        focusedIndex,
      }}
    >
      <DropdownDispatchContext.Provider
        value={{
          setItems,
          toggle,
          selectItem: setSelectedIndex,
          focusItem: setFocusedIndex,
        }}
      >
        {children}
      </DropdownDispatchContext.Provider>
    </DropdownContext.Provider>
  );
};

const DropdownContainer = ({ children }: PropsWithChildren) => {
  return <div className={cx('Dropdown')}>{children}</div>;
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
      {selectedItem?.text || '항목을 선택하세요'}
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
  const { selectedIndex, focusedIndex } = useDropdown();
  const { selectItem, focusItem } = useSetDropdown();

  return (
    <li
      className={cx('item')}
      role="option"
      aria-selected={selectedIndex === index}
      aria-current={focusedIndex === index}
    >
      <button
        onClick={() => selectItem(index)}
        onMouseEnter={() => focusItem(index)}
      >
        {item.text}
      </button>
    </li>
  );
};

const DropdownList = () => {
  const { items } = useDropdown();
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
