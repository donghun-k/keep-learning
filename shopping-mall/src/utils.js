export const findEl = (startingEl, selector) => {
  let currentEl = startingEl;
  while (currentEl) {
    if (currentEl.matches(selector)) {
      return currentEl;
    }
    currentEl = currentEl.parentElement;
  }
  return null;
};
