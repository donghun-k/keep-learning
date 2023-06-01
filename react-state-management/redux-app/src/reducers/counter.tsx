interface Action {
  type: string;
}

const counter = (state = 0, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      if (state > 0) {
        return state - 1;
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default counter;
