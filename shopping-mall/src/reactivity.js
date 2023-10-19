export const bindReactiveState = ({ name, defaultValue }) => {
  if (typeof defaultValue !== 'object') {
    throw new Error('defaultValue must be an object');
  }

  let value = new Proxy(defaultValue, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, newValue) {
      target[prop] = newValue;
      const els = Array.from(
        document.querySelectorAll(
          `[data-subscribe-to="${name}"][data-subscription-path="${prop}"]`
        )
      );
      els.forEach((el) => {
        el.innerHTML = newValue;
      });
      return true;
    },
  });

  return value;
};
