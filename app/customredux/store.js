const createStore = (reducer, initialState) => {
  let state = initialState;
  let listners = [];

  const getState = () => {
    return state;
  };

  const subscribe = (listener) => {
    listners.push(listener);

    return () => {
      listners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);

    listners.forEach((l) => l());
  };

  if (initialState === undefined) {
    dispatch("@@INIT");
  }

  return { getState, subscribe, dispatch };
};

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INC":
      return { count: state.count + 1 };
    case "DEC":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(countReducer);

export default store;