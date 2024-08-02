import { throwingFunc } from "./throwing-func";

class Test {
  public constructor() {
    this.#privateMethod();
  }

  #privateMethod() {
    throwingFunc();
  }
}

new Test();
