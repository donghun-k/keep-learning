export const bindReactiveState = ({ name, defaultValue }) => {
  if (typeof defaultValue !== 'object') {
    throw new Error('defaultValue must be an object');
  }

  let value = defaultValue;

  const getter = () => {
    return value;
  };
  const setter = (newValue) => {
    const oldKeys = Object.keys(value);
    const newKeys = Object.keys(newValue);
    // const removedKeys = [];
    const changedKeys = [];

    oldKeys.forEach((key) => {
      if (value[key] !== newValue[key]) {
        changedKeys.push(key);
      }
    });

    newKeys.forEach((key) => {
      if (!oldKeys.includes(key)) {
        changedKeys.push(key);
      }
    });

    const uniqueChangedKeys = Array.from(new Set(changedKeys));

    uniqueChangedKeys.forEach((key) => {
      const els = Array.from(
        document.querySelectorAll(
          `[data-subscribe-to="${name}"][data-subscription-path="${key}"]`
        )
      );
      els.forEach((el) => {
        el.innerHTML = newValue[key];
      });
    });

    value = newValue;
  };

  return [getter, setter];
};
