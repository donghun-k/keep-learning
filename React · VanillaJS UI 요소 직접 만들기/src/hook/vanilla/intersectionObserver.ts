const vanillaIntersectionObserver = (
  $el: HTMLElement,
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void
) => {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (!$el) return;
    callback(entries);
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe($el);

  return observer;
};

export default vanillaIntersectionObserver;
