import {
  createContext,
  Dispatch,
  KeyboardEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
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
  children: ReactNode;
};
export type DropdownListProps = {
  isOpen: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

const useDropdown = <T>(list: T[]) => {
  const [items, setItems] = useState<T[]>(list);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, focusItem] = useState(-1);
  const [selectedIndex, selectItem] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLLIElement[] | null[]>([]);

  const size = items.length;

  const toggle = (force?: boolean) => {
    setIsOpen((prev) => (typeof force === 'boolean' ? force : !prev));
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

  const getContainerProps = useCallback(
    () => ({
      containerRef,
      handleKeyDown: (e: KeyboardEvent<Element>) => {
        const { key } = e;
        const handler = KEY_EVENT_MAP[key];
        if (handler) {
          handler(e, {
            items,
            focusedIndex,
            focusItem,
            selectItem,
            toggle,
          });
        }
      },
    }),
    [size, focusedIndex, focusItem, selectItem, toggle]
  );

  const getTriggerProps = useCallback(
    () => ({
      selectedItem: items[selectedIndex],
      toggle,
    }),
    [selectedIndex, toggle]
  );

  const getListProps = useCallback(
    () => ({
      items,
      isOpen,
      containerRef,
    }),
    [items, isOpen]
  );

  const getItemProps = useCallback(
    (index: number) => ({
      index,
      item: items[index],
      focusedIndex,
      selectedIndex,
      itemsRef,
      selectItem,
    }),
    [items, focusedIndex, selectedIndex, selectItem, itemsRef]
  );

  return {
    getContainerProps,
    getTriggerProps,
    getListProps,
    getItemProps,
  };
};

export default useDropdown;
