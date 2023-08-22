// reducer
import { AddCoute, ChangeBaner } from "./constants.js";
const initStore = {
  couter: 0,
  banners: [],
};
export const reducer = (state = initStore, action) => {
  switch (action.type) {
    case AddCoute:
      return { ...state, couter: state.couter + action.couter };
    case ChangeBaner:
      return { ...state, banners: action.banners };
    default:
      return state;
  }
};
