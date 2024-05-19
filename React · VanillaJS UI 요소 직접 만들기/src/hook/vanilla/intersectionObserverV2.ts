const vanillaIntersectionObserverV2 = (
  $el: HTMLElement | HTMLElement[],
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void
) => {
  const entriesState: Map<Element, IntersectionObserverEntry> = new Map();
  if (!$el) return;

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const $item = entry.target;
      entriesState.set($item, entry);
    });
    callback(
      Array.from(entriesState.values()).filter((entry) => entry.isIntersecting)
    );
  };
  const observer = new IntersectionObserver(handleIntersect, options);

  if (Array.isArray($el)) $el.forEach((n) => n && observer.observe(n));
  else observer.observe($el);

  return observer;
};

export default vanillaIntersectionObserverV2;
