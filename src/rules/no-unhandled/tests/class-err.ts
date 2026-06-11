export class MyClass {
  ok() {
    console.log("ok");
  }

  throwError() {
    throw new Error("test");
  }

  getError() {
    this.throwError();
    try {
      this.throwError();
    } catch {
      throw new Error("test");
    }
  }
  async throwErrorAsync() {
    throw new Error("test");
  }

  async getErrorAsync() {
    await this.throwErrorAsync();
    try {
      await this.throwErrorAsync();
    } catch {
      throw new Error("test");
    }
  }
}
const myClass = new MyClass();
myClass.getError();
myClass.getErrorAsync();
myClass.ok();
