import { throwingFunc } from "./throwing-func";

try {
  throwingFunc();
} catch (e) {
  console.error(e);
}

function a() {
  throwingFunc();
}

try {
  a();
} catch (e) {
  console.error(e);
}

function b() {
  try {
    throwingFunc();
  } catch (e) {
    console.error(e);
  }
}

b();
