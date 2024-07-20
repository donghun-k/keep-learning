import useIntersectionObserver from '@/hook/useIntersectionObserverV2';
import { RefObject, useEffect, useRef, useState } from 'react';
import cx from '../cx';

export interface LazyImageProps {
  src: string;
  width: number;
  height: number;
  rootElRef?: RefObject<HTMLElement>;
}

const options: IntersectionObserverInit = {
  threshold: 0,
};

const LazyImage = ({ src, width, height, rootElRef }: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  options.root = rootElRef?.current || null;

  const { entries, observerRef } = useIntersectionObserver(imgRef, options);

  useEffect(() => {
    const isVisible = entries[0]?.isIntersecting;
    if (isVisible) {
      const onLoad = () => {
        setLoaded(true);
      };
      imgRef.current!.addEventListener('load', onLoad, { once: true });
      imgRef.current!.src = src;
      observerRef.current?.disconnect();
    }
  }, [src, entries]);

  return (
    <img
      className={cx({ lazy: !loaded })}
      ref={imgRef}
      width={width}
      height={height}
      alt="image"
    />
  );
};

export default LazyImage;
