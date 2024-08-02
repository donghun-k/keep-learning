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

type DropdownProps<T> = {
  items: T[];
  isOpen: boolean;
  selectedIndex: number;
  focusedIndex: number;
  itemsRef: RefObject<HTMLLIElement[] | null[]>;
};

type DropdownDispatchProps<T> = {
  setItems: Dispatch<SetStateAction<T[]>>;
  toggle: (force?: boolean) => void;
  selectItem: Dispatch<SetStateAction<number>>;
  focusItem: Dispatch<SetStateAction<number>>;
  handleKeyDown: (e: KeyboardEvent<Element>) => void;
};

type KeyEventHandler = <T>(
  e: KeyboardEvent,
  props: Pick<DropdownProps<T>, 'focusedIndex' | 'items'> &
    Pick<DropdownDispatchProps<T>, 'focusItem' | 'selectItem' | 'toggle'>
) => void;

type Headless<T> = {
  children: (props: T) => JSX.Element | null;
};

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

export type DropdownContainerProps = {
  handleKeyDown: (e: KeyboardEvent) => void;
};
export type DropdownTriggerProps<T> = {
  selectedItem: T;
  toggle: (force?: boolean) => void;
};
export type DropdownItemProps<T> = {
  item: T;
  index: number;
  focusedIndex: number;
  selectedIndex: number;
  itemsRef: RefObject<HTMLLIElement[] | null[]>;
  selectItem: Dispatch<SetStateAction<number>>;
};
export type DropdownListProps<T> = {
  items: T[];
  isOpen: boolean;
};

const createDropdown = <T,>() => {
  const DropdownContext = createContext<DropdownProps<T>>({
    items: [],
    isOpen: false,
    selectedIndex: -1,
    focusedIndex: -1,
    itemsRef: { current: [] },
  });

  const DropdownDispatchContext = createContext<DropdownDispatchProps<T>>({
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
  }: { list: T[] } & PropsWithChildren) => {
    const [items, setItems] = useState<T[]>(list);
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

  const DropdownContainer = ({
    Component,
    children,
  }: { Component: (props: any) => JSX.Element } & PropsWithChildren) => {
    const { handleKeyDown } = useSetDropdown();
    return <Component handleKeyDown={handleKeyDown}>{children}</Component>;
  };

  const DropdownTrigger = ({ children }: Headless<DropdownTriggerProps<T>>) => {
    const { selectedIndex, items } = useDropdown();
    const { toggle } = useSetDropdown();
    const selectedItem = items[selectedIndex];

    return children({ selectedItem, toggle });
  };

  const DropdownItem = ({
    item,
    index,
    children,
  }: Headless<DropdownItemProps<T>> &
    Pick<DropdownItemProps<T>, 'item' | 'index'>) => {
    const { selectedIndex, focusedIndex, itemsRef } = useDropdown();
    const { selectItem } = useSetDropdown();

    return children({
      item,
      index,
      focusedIndex,
      selectedIndex,
      itemsRef,
      selectItem,
    });
  };

  const DropdownList = ({ children }: Headless<DropdownListProps<T>>) => {
    const { items, isOpen } = useDropdown();
    return children({ items, isOpen });
  };

  const Dropdown = {
    Provider: DropdownContextProvider,
    Container: DropdownContainer,
    Trigger: DropdownTrigger,
    List: DropdownList,
    Item: DropdownItem,
  };

  return Dropdown;
};

export default createDropdown;
