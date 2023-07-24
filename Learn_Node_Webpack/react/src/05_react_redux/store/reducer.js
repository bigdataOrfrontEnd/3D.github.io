// reducer
import { AddCoute } from "./constants.js";
const initStore = {
  couter: 0,
};
export const reducer = (state = initStore, action) => {
  switch (action.type) {
    case AddCoute:
      return { ...state, couter: state.couter + action.couter };

    default:
      return state;
  }
};
