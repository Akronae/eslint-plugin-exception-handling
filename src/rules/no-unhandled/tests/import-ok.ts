import { throwingFunc } from "./throwing-func";

function a() {
  b();
}

function b() {
  c();
}

function c() {
  d();
}

function d() {
  throwingFunc();
}

try {
  a();
} catch (e) {
  console.error(e);
}
