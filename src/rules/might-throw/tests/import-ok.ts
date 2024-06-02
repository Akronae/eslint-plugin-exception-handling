import { throwingFunc } from "./throwing-func";

try {
  throwingFunc();
} catch (e) {
  console.error(e);
}

function a() {
  try {
    throwingFunc();
  } catch (e) {
    console.error(e);
  }
}

a();

function b() {
  try {
    throwingFunc();
  } catch (e) {
    console.error(e);
  }
}

b();
