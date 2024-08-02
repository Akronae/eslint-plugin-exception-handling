import { throwingFunc } from "./throwing-func";

class Test {
  public constructor() {
    this.#privateMethod();
  }

  #privateMethod() {
    console.log("Hello");
  }
}

new Test();

class Test2 {
  public constructor() {
    this.#privateMethod();
  }

  #privateMethod() {
    throwingFunc();
  }
}

try {
  new Test2();
} catch (e) {
  console.error(e);
}
