import { RefObject, useEffect, useRef, useState } from 'react';

type Elem = Element | null;

const DefaultOption: IntersectionObserverInit = { threshold: 0 };

const useIntersectionObserver = (
  elemRef: RefObject<Elem | Elem[]>,
  options: IntersectionObserverInit = DefaultOption
) => {
  const observerRef = useRef<IntersectionObserver>();
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const node = elemRef.current;
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setEntries((prev) => {
        return Array.from(
          new Map(
            prev.concat(entries).map((entry) => [entry.target, entry])
          ).values()
        ).filter((entry) => entry.isIntersecting);
      });
    };
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersect, options);
    observerRef.current = observer;
    if (Array.isArray(node)) node.forEach((n) => n && observer.observe(n));
    else observer.observe(node);

    return () => {
      observer?.disconnect();
    };
  }, [elemRef, options]);

  return {
    entries,
    observerRef,
  };
};

export default useIntersectionObserver;
