import { throwingFunc } from "./throwing-func";

function a() {
  b();
}

function b() {
  try {
    c();
  } catch (e) {
    console.error(e);
  }
}

function c() {
  d();
}

function d() {
  throwingFunc();
}

a();
