import useIntersectionObserver from '@/hook/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import useInfiniteFetcher from './useInfiniteFetcher';

const useInfinteScroll = () => {
  const { state, data, fetchNextPage } = useInfiniteFetcher();
  const moreRef = useRef<HTMLDivElement>(null);
  const {
    entries: [entry],
  } = useIntersectionObserver(moreRef, { threshold: 0.5 });
  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return {
    state,
    data,
    moreRef,
  };
};

export default useInfinteScroll;
