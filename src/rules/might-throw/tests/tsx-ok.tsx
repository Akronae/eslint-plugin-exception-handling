import { imptGenericFunc } from "./generic-impt-ok";
import { genericFunc } from "./generic-ok";

export function MyComp() {
  genericFunc<boolean>([false]);
  imptGenericFunc();
  return <div>Hello World</div>;
}
