import { throwingFunc } from "./throwing-func";

function a() {
  throwingFunc();
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
