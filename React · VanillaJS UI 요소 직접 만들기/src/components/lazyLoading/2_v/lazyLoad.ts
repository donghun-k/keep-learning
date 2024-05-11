import vanillaIntersectionObserverV2 from '@/hook/vanilla/intersectionObserverV2';

interface LazyLoadOptions {
  $el: HTMLImageElement;
  src: string;
}

const lazyLoad = ({ $el, src }: LazyLoadOptions) => {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('src', src);
        observer?.disconnect();
      }
    });
  };

  const observer = vanillaIntersectionObserverV2(
    $el,
    { threshold: 0 },
    handleIntersect
  );
};

export default lazyLoad;
