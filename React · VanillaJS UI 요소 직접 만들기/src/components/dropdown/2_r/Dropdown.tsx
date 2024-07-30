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

export type DropdownItemType = {
  id: string;
  text: string;
};

type DropdownProps = {
  items: DropdownItemType[];
  isOpen: boolean;
  selectedIndex: number;
  focusedIndex: number;
  itemsRef: RefObject<HTMLLIElement[] | null[]>;
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
    focusItem((prev) => Math.max(prev - 1, 0));
  },
  ArrowDown: (e, { focusItem, items }) => {
    focusItem((prev) => Math.min(prev + 1, items.length - 1));
  },
  Enter: (e, { selectItem, focusedIndex, toggle }) => {
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

  const itemsRef = useRef<HTMLLIElement[] | null[]>([]);

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

const DropdownContainer = ({
  Component,
  children,
}: { Component: (props: any) => JSX.Element } & PropsWithChildren) => {
  const { handleKeyDown } = useSetDropdown();
  return <Component handleKeyDown={handleKeyDown}>{children}</Component>;
};

const DropdownTrigger = ({
  Component,
}: {
  Component: (props: any) => JSX.Element;
}) => {
  const { selectedIndex, items } = useDropdown();
  const { toggle } = useSetDropdown();
  const selectedItem = items[selectedIndex];

  return <Component selectedItem={selectedItem} toggle={toggle} />;
};

const DropdownItem = ({
  item,
  index,
  Component,
}: {
  item: DropdownItemType;
  index: number;
  Component: (props: any) => JSX.Element;
}) => {
  const { selectedIndex, focusedIndex, itemsRef } = useDropdown();
  const { selectItem } = useSetDropdown();

  return (
    <Component
      item={item}
      index={index}
      focusedIndex={focusedIndex}
      selectedIndex={selectedIndex}
      itemsRef={itemsRef}
      selectItem={selectItem}
    />
  );
};

const DropdownList = ({
  Component,
}: {
  Component: (props: any) => JSX.Element;
}) => {
  const { items, isOpen } = useDropdown();
  if (!isOpen) return null;

  return <Component items={items} isOpen={isOpen} />;
};

const Dropdown = {
  Provider: DropdownContextProvider,
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  List: DropdownList,
  Item: DropdownItem,
};

export default Dropdown;
