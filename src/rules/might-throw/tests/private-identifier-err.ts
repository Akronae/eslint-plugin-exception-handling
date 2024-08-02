import { throwingFunc } from "./throwing-func";

export class Test {
  public constructor() {
    this.#privateMethod();
  }

  #privateMethod() {
    throwingFunc();
  }
}

new Test();
