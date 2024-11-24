import { genericFunc } from "./generic-ok";

export const imptGenericFunc = () => {
  return genericFunc<boolean>([false]);
};
