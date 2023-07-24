import { AddCoute, ChangeBaner } from "./constants.js";
export const AddCoutAction = (name) => {
  return { type: AddCoute, couter: name };
};
export const ActionBanners = (banners) => {
  return { type: ChangeBaner, banners: banners };
};
