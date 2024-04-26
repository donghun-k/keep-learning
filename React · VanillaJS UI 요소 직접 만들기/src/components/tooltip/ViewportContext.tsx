import {
  ReactNode,
  createContext,
  useContext,
  useSyncExternalStore,
} from 'react';

type Rect = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'> & {
  scrollHeight: number;
};

const defaultRect: Rect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = [
  'scrollHeight',
  'top',
  'left',
  'width',
  'height',
];

const isSameRect = (prev: Rect, next: Rect) => {
  return rectKeys.every((k) => prev[k] === next[k]);
};

const getViewportRect = () => {
  let stored: Rect = defaultRect;
  return () => {
    const el = typeof document !== 'undefined' && document.scrollingElement;
    if (!el) return stored;
    const { left, top, width, height } = el.getBoundingClientRect();
    const newRect = { left, top, width, height, scrollHeight: el.scrollHeight };
    if (newRect && !isSameRect(stored, newRect)) {
      stored = newRect;
    }
    return stored;
  };
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  window.addEventListener('scroll', callback);
  resizeObserver.observe(document.body);
  return () => {
    window.removeEventListener('scroll', callback);
    resizeObserver.disconnect();
  };
};

const ViewportContext = createContext(defaultRect);

const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
  const viewportRect = useSyncExternalStore(subscribe, getViewportRect());
  return (
    <ViewportContext.Provider value={viewportRect}>
      {children}
    </ViewportContext.Provider>
  );
};
export default ViewportContextProvider;

export const useViewportRect = () => useContext(ViewportContext);
