import { bindReactiveState } from './reactivity.js';

export const setUpCounter = () => {
  const [getCountMap, setCountMap] = bindReactiveState({
    name: 'countMap',
    defaultValue: {},
  });
  const callbacks = [];

  const increase = ({ productId }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined) {
      newCountMap[productId] = 0;
    }
    newCountMap[productId] += 1;
    setCountMap(newCountMap);
    return newCountMap[productId];
  };
  const decrease = ({ productId }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined || newCountMap[productId] === 0) {
      newCountMap[productId] = 0;
    }
    if (newCountMap[productId] > 0) {
      newCountMap[productId] -= 1;
    }
    setCountMap(newCountMap);
    return newCountMap[productId];
  };

  const getTotalCount = () => {
    return Object.values(getCountMap()).reduce((acc, count) => acc + count, 0);
  };

  const getCountByProductId = ({ productId }) => {
    return getCountMap()[productId] || 0;
  };

  return {
    increase,
    decrease,
    getTotalCount,
    getCountByProductId,
  };
};
