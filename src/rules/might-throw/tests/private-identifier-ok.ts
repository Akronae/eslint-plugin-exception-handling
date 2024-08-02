export class Test {
  public constructor() {
    this.#privateMethod();
  }

  #privateMethod() {
    console.log("Hello");
  }
}

new Test();
