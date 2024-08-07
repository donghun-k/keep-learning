import { RefObject, useEffect, useRef, useState } from 'react';
import cx from '../cx';
import data from '../data';
import useIntersectionObserver from '@/hook/useIntersectionObserver';

export interface LazyImageProps {
  src: string;
  width: number;
  height: number;
  rootElRef?: RefObject<HTMLElement>;
}

const options: IntersectionObserverInit = {
  threshold: 0,
};

export const LazyImage = ({
  src,
  width,
  height,
  rootElRef,
}: LazyImageProps) => {
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

const LazyLoading1 = () => {
  const [builtInLazySupported, setBuiltInLazySupported] = useState<
    null | boolean
  >(null);
  const ImageComponent = builtInLazySupported
    ? (props: any) => <img {...props} loading="lazy" />
    : LazyImage;

  useEffect(() => {
    setBuiltInLazySupported('loading' in HTMLImageElement.prototype);
  }, []);

  if (builtInLazySupported === null) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h2>Lazy Loading</h2>
      <h3>#1. React</h3>
      {data.map((url, i) => (
        <ImageComponent key={i} src={url} width={600} height={320} />
      ))}
    </>
  );
};

export default LazyLoading1;
