import { AddCoute } from "./constants.js";
export const AddCoutAction = (name) => {
  return { type: AddCoute, couter: name };
};
