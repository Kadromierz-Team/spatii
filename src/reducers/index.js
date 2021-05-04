const rootReducer = (state, action) => {
  let newState;
  if (action.type === 'RESET_STATE') {
    newState = { test: true, testArray: [1, 2, 3, 4] };
  }
  return newState;
};
export default rootReducer;
