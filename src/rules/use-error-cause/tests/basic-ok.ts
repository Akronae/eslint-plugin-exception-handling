function throwingFunction() {
  throw new Error("This is an error");
}

function a() {
  throwingFunction();
}

function b() {
  try {
    a();
  } catch (e) {
    console.error(e);
  }
}

function c() {
  b();
}

function d() {
  try {
    a();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

function e() {
  try {
    a();
  } catch (e) {
    console.error(e);
    throw new Error("This is another error", { cause: e });
  }
}

export {};
