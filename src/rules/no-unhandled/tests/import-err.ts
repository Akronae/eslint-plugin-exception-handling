import { throwingFunc } from "./throwing-func";

function c() {
  d();
}

function a() {
  b();
}

function b() {
  c();
}

function d() {
  try {
    console.log("hey!");
  } catch (e) {
    console.error(e);
  }

  throwingFunc();
}

a();
